let amqp = require('amqplib');
let option = require("./mqConfig");

class MQ {

	constructor() {
		this.open = amqp.connect(option);
	}

	/**
	 * 向指定队列发送消息
	 * @param {*} queue
	 * @param {*} msg
	 */
	sendMsg(queue, msg) {
		let that = this;
			return new Promise((resolve, reject) => {
				that.open.then(
							conn => {
									return conn.createChannel().then(
											channel => {
													return channel.assertQueue(queue, {durable: false}).then(
															({queue, messageCount, consumerCount}) => {
																	channel.sendToQueue(queue, Buffer.from(msg));
																	console.log(`消息已被发送: ${msg}`);
																	resolve();
																	return channel.close();
															}
													)
											}
									).finally(
											() => {
													conn.close();
											}
									)
							}
					).catch(console.error)
			})
	}

	/**
	 * 拉取指定队列的所有消息
	 * @param {*} queue
	 */
	pullMsg(queue) {
		let that = this;
			return new Promise((resolve, reject) => {
				that.open.then(
						conn => {
							return conn.createChannel().then(
									async channel => {
											let pullMsg = [];
											async function pull(queue) {
												let msg = await channel.get(queue, {noAck: true});
												if (msg.content) {
													return msg.content.toString();
												} else {
													return "";
												}
											}
											while (true) {
												let res = await pull(queue);
												if (res) {
													pullMsg.push(res)
												} else {
													break;
												}
											}
											resolve(pullMsg);
											return channel.deleteQueue(queue).then(
												({messageCount}) => {
														console.log(`队列[${queue}]已被删除，丢失消息数[${messageCount}]`);
														channel.close();
												}
											)
									}
							).finally(
								() => {
									conn.close();
								}
							)
						}
					)
			})
	}

	/**
	 * 删除指定队列
	 * @param {*} queue 
	 */
	deleteQueue(queue) {
		let that = this;
			return new Promise((resolve, reject) => {
				that.open.then(
							conn => {
									conn.createChannel().then(
											channel => {
													channel.deleteQueue(queue).then(
															({messageCount}) => {
																	console.log(`队列[${queue}]已被删除，丢失消息数[${messageCount}]`);
																	channel.close();
																	conn.close();
																	resolve();
															}
													)
											}
									).catch(
											() => {
													conn.close();
											}
									)
							}
					).catch(console.error)
			})
	}
}

module.exports = MQ;