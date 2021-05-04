const express = require('express');
const router = express.Router();
const { login, logout, isUserOnline } = require('../utils/commonFun');
// const Request = require('../utils/request');

router.io = function(io) {
	io.on('connect', function(socket) {
		/**
		 * 监听客户端发送消息事件
		 */
		socket.on('sendMsgToUser', function(data) {
			/**
			 * 先判断消息的目标用户是否在线、在线则发送，不在线则将消息发送至 [消息中心] ，由其处理
			 */
			const { ProducerID, ConsumerID, Msg, Timestamp } = data;
			isUserOnline(ConsumerID).then(online => {
				if (online) {
					io.to(ConsumerID).emit('receiveUserMsg', { ProducerID, Msg, Timestamp });
				} else {
					const data = {
						queue: `${ConsumerID}-queue`,
						msg: Msg
					};
					// Request.post('/msgCenter/send', data).then(
					// 	() => {
					// 		console.log('用户不在线，消息已发送至 [消息中心]');
					// 	},
					// 	err => {
					// 		console.log(err);
					// 	}
					// );
				}
			});
		});

		/**
		 * 使用uid标识room，方便消息的发送
		 */
		socket.on('initUserRoom', function(data) {
			const { socketId, uid } = data;
			socket.leave(socketId);
			socket.join(uid);
			login(socketId, uid);
		});

		/**
		 * 退出系统（掉线、主动退出等）
		 */
		socket.on('disconnecting', () => {
			const socketId = socket.id;
			logout(socketId);
		});
	});
};

module.exports = router;
