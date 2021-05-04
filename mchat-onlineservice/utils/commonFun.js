const os = require('os');
const moment = require('moment');
const Request = require('./request');
const {
	ServiceID, ServiceConfigAddr, ServicePort, ServiceWeight,
	ApiKey, ServiceDesc, ConsumerKey, ConsumerConfigAddr
} = require('../config/serviceConfig');
const { onlineClient, uidRelationClient } = require('./redis-helper');

/**
 * 用户登录，信息存入redis
 * @param {String} socketId 当前socketId
 * @param {Number} uid 用户唯一ID
 */
function login(socketId, uid) {
	return new Promise((resolve, reject) => {
		if (socketId && uid) {
			uidRelationClient.set(socketId, uid);
			onlineClient.set(uid, uid);
			resolve(true);
		} else {
			reject(false);
		}
	});
}

/**
 * 用户退出系统，redis删除记录
 * @param {Number} socketId 当前socketId
 */
function logout(socketId) {
	return new Promise((resolve, reject) => {
		if (socketId) {
			uidRelationClient.get(socketId, (err, reply) => {
				if (!err) {
					onlineClient.del(reply);
					uidRelationClient.del(socketId);
					resolve(true);
				}
			});
		} else {
			resolve(true);
		}
	});
}

/**
 * 判断用户是否在线
 * @param {Number} uid 用户唯一ID
 */
function isUserOnline(uid) {
	return new Promise((resolve, reject) => {
		onlineClient.get(uid, (err, reply) => {
			if (!err) {
				if (reply) {
					resolve(true);
				} else {
					resolve(false);
				}
			}
		});
	});
}

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
			console.log(`[在线服务]注册成功: ${serviceAddress} ${time}`);
		},
		(err) => {
			console.log(err, `[在线服务]注册失败 ${time}`);
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
		desc: ServiceDesc,
		upstream: {
			type: 'roundrobin',
			key: 'apikey',
			'hash_on ': 'header',
			nodes
		},
		'enable_websocket': true
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
					console.log(`[在线服务]注册成功: ${serviceAddress} ${time}`);
				},
				err => {
					console.log(err, `[在线服务]注册失败 ${time}`);
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
		(res) => {
			// 已有服务注册，更新服务注册信息
			updateService();
		},
		(err) => {
			// 目前尚无服务注册
			addService();
		}
	);
}

module.exports.login = login;
module.exports.logout = logout;
module.exports.isUserOnline = isUserOnline;
module.exports.registerService = registerService;
