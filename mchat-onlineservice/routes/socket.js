let express = require("express");
let router = express.Router();
let redisClient = require("../utils/redis-helper");

router.io = function(io) {
	io.on("connect", function(socket) {
		let uid = 123456;
		login(uid);
		/**
		 * 监听客户端发送消息事件
		 */
		socket.on("sendMsg", function(data) {
			/**
			 * 先判断消息的目标用户是否在线、在线则发送，不在线则将消息发送至 [消息中心] ，由其处理
			 */
			const {tid, msg, uid} = data;
			io.to(tid).emit("receiveMsg", {tid: uid, msg});
		});
		/**
		 * 使用UID作为room，方便消息的发送
		 */
		socket.on("initRoom", function(data) {
			socket.leave(data.socketId);
			socket.join(data.uid);
		})
		/**
		 * 退出系统（掉线、主动退出等）
		 */
		socket.on("disconnecting", () => {
			// 获取uid
			logout(123456);
		})
	});
}

/**
 * 用户登录，信息存入redis
 * @param {Number} uid 用户唯一ID
 */
function login(uid) {
	redisClient.set(uid, uid);
}

/**
 * 用户退出系统，redis删除记录
 * @param {Number} uid 用户唯一ID
 */
function logout(uid) {

}

module.exports = router;