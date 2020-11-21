let express = require("express");
let router = express.Router();
let {login, logout, isUserOnline} = require("../utils/commonFun");
let Request = require("../utils/request");

router.io = function(io) {

	io.on("connect", function(socket) {
		/**
		 * 监听客户端发送消息事件
		 */
		socket.on("sendMsgToUser", function(data) {
			/**
			 * 先判断消息的目标用户是否在线、在线则发送，不在线则将消息发送至 [消息中心] ，由其处理
			 */
			const {tid, msg, uid} = data;
			isUserOnline(tid).then(online => {
				if (online) {
					io.to(tid).emit("receiveUserMsg", {tid: uid, msg});
				} else {
					let data = {
						queue: `${tid}-queue`,
						msg
					}
					Request.post("/msgCenter/sendMsg", data).then(
						() => {
							console.log("用户不在线，消息已发送至 [消息中心]");
						},
						err => {
							console.log(err);
						}
					);
				}
			})
		});

		/**
		 * 使用uid标识room，方便消息的发送
		 */
		socket.on("initUserRoom", function(data) {
			let {socketId, uid} = data;
			socket.leave(socketId);
			socket.join(uid);
			login(socketId, uid);
		})

		/**
		 * 退出系统（掉线、主动退出等）
		 */
		socket.on("disconnecting", () => {
			let socketId = socket.id;
			logout(socketId);
		})
	});
}

module.exports = router;