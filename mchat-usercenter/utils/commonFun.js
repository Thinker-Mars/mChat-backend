const os = require('os');
const moment = require('moment');
const { createHash, generateKeyPair, privateDecrypt } = require('crypto');
const {
	ServiceID, ServiceConfigAddr, ServicePort, ServiceWeight,
	ApiKey, ServiceDesc, ConsumerKey, ConsumerConfigAddr
} = require('../config/serviceConfig');
const Request = require('./request');

/**
 * 获取IP
 */
function getIP() {
	const interfaces = os.networkInterfaces();
	for (const type in interfaces) {
		const netInfos = interfaces[type];
		for (let i = 0; i < netInfos.length; i++) {
			const netInfo = netInfos[i];
			if (netInfo.family === 'IPv4' && netInfo.address !== '127.0.0.1' && !netInfo.internal) {
				return netInfo.address;
			}
		}
	}
}

/**
 * 获取服务信息
 */
function getService() {
	const serviceUrl = `${ServiceConfigAddr}/${ServiceID}?api_key=${ApiKey}`;
	return Request.get(serviceUrl);
}

/**
 * 更新服务
 */
function updateService() {
	/**
	 * 此服务的地址：ip:port
	 */
	const serviceAddress = `${getIP()}:${ServicePort}`;

	const serviceReqUrl = `${ServiceConfigAddr}/${ServiceID}?api_key=${ApiKey}`;

	/**
	 * 当前时间
	 */
	const time = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

	const nodes = {};
	nodes[serviceAddress] = ServiceWeight;
	const data = {
		upstream: {
			nodes
		}
	};

	Request.patch(serviceReqUrl, data).then(
		() => {
			console.log(`[用户服务]注册成功: ${serviceAddress} ${time}`);
		},
		(err) => {
			console.log(err, `[用户服务]注册失败 ${time}`);
		}
	);
}

/**
 * 新增服务
 */
function addService() {
	/**
	 * 此服务的地址：ip:port
	 */
	const serviceAddress = `${getIP()}:${ServicePort}`;

	const serviceReqUrl = `${ServiceConfigAddr}/${ServiceID}?api_key=${ApiKey}`;

	const consumerReqUrl = `${ConsumerConfigAddr}/?api_key=${ApiKey}`;

	/**
		* 生成当前时间
		*/
	const time = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

	const nodes = {};
	nodes[serviceAddress] = 1;
	const serviceData = {
		plugins: {
			'key-auth': {}
		},
		desc: ServiceDesc,
		upstream: {
			type: 'roundrobin',
			nodes
		}
	};

	const consumerData = {
		username: ConsumerKey,
		plugins: {
			'key-auth': {
				'key': ConsumerKey
			}
		}
	};

	// 注册consumer
	Request.put(consumerReqUrl, consumerData).then(
		(res) => {
			// 注册service
			Request.put(serviceReqUrl, serviceData).then(
				() => {
					console.log(`[消息中心服务]注册成功: ${serviceAddress} ${time}`);
				},
				err => {
					console.log(err, `[消息中心服务]注册失败 ${time}`);
				}
			);
		}
	);
}

/**
 * 服务启动之后，向网关注册服务信息
 */
function registerService() {
	// 先判断是否已有相关服务存在
	getService().then(
		// 已有服务注册，更新服务注册信息
		(res) => {
			updateService();
		},
		// 目前尚无服务注册 (404 not found)
		(err) => {
			addService();
		}
	);
}

/**
 * 生成非对称加密用的公钥与私钥
 */
function generateKey() {
	return new Promise((resolve, reject) => {
		generateKeyPair(
			'rsa',
			{
				modulusLength: 1024,
				publicKeyEncoding: {
					type: 'pkcs1',
					format: 'pem'
				},
				privateKeyEncoding: {
					type: 'pkcs1',
					format: 'pem'
				}
			},
			(err, publicKey, privateKey) => {
				if (err) {
					reject(err);
				} else {
					resolve({ publicKey, privateKey });
				}
			}
		);
	});
}

/**
 * 盐加密
 * @param {string} salt 盐
 * @param {string} content 要加密的内容
 * @returns 加密后的内容
 */
function saltEncrypt(salt, content) {
	const md5 = createHash('md5');
	md5.update(salt + content);
	return md5.digest('base64');
}

/**
 * RSA 解密
 * @param {string} privateKey 私钥
 * @param {string} data 加密后的数据
 * @returns 解密的数据
 */
function decrypt(privateKey, data) {
	return privateDecrypt(privateKey, Buffer.from(data, 'base64')).toString();
}

/**
 * 生成UUID
 * @returns UUID
 */
function generateUUID() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}
	return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

module.exports.registerService = registerService;
module.exports.generateKey = generateKey;
module.exports.decrypt = decrypt;
module.exports.generateUUID = generateUUID;
module.exports.saltEncrypt = saltEncrypt;
