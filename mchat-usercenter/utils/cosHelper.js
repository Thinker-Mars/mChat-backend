const { Bucket, Region, SecretId, SecretKey } = require('../config/cosConfig');

const COS = require('cos-nodejs-sdk-v5');

// /**
//  * 计算请求签名
//  * @param {string} method 请求方法，get | post | delete 等
//  * @param {string} key 对象键（Object 的名称）对象在存储桶中的唯一标识
//  * @param {number} expires 签名有效时间，默认为900秒
//  * @returns sign 签名
//  */
// function calcAuthorization(method, key, expires = 60) {
// 	return COS.getAuthorization({
// 		SecretId: SecretId,
// 		SecretKey: SecretKey,
// 		Method: method,
// 		Key: key,
// 		Expires: expires
// 	});
// }

/**
 * 获取图片URL
 * @param {string} key 图片名
 */
function getObjectUrl(key) {
	return new Promise((resolve, reject) => {
		const cos = new COS({ SecretId, SecretKey });
		cos.getObjectUrl(
			{ Bucket, Region, Key: key },
			(err, data) => {
				if (err) {
					reject(err);
				} else {
					const { Url } = data;
					resolve(Url);
				}
			}
		);
	});
}

/**
 * 批量获取图片URL
 * @param {array} keys 图片名
 */
function batchGetObjectUrl(keys) {
	return new Promise((resolve, reject) => {
		const cos = new COS({ SecretId, SecretKey });
		function fetch(key) {
			return new Promise((resolve, reject) => {
				cos.getObjectUrl(
					{ Bucket, Region, Key: key },
					(err, data) => {
						if (err) {
							console.log(err);
							reject({ err, key });
						} else {
							const { Url } = data;
							resolve({ key, url: Url });
						}
					}
				);
			});
		}
		const allFetch = [];
		keys.forEach((key) => {
			allFetch.push(fetch(key));
		});
		Promise.allSettled(allFetch).then(
			(res) => {
				const fetchResult = {};
				res.forEach((data) => {
					const { status, value, reason } = data;
					if (status === 'fulfilled') {
						const { key, url } = value;
						fetchResult[key] = url;
					} else {
						const { err, key } = reason;
						console.log(err);
						fetchResult[key] = '';
					}
				});
				resolve(fetchResult);
			}
		);
	});
}

module.exports.getObjectUrl = getObjectUrl;
module.exports.batchGetObjectUrl = batchGetObjectUrl;
