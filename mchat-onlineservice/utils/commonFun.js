let {onlineClient, uidRelationClient} = require("./redis-helper");

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
	})
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
	})
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
		})
	})
}

module.exports.login = login;
module.exports.logout = logout;
module.exports.isUserOnline = isUserOnline;