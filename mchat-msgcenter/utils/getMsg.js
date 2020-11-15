let amqp = require('amqplib');
let option = require("./mqConfig");

function getMsg(queue) {
    return new Promise((resolve, reject) => {
        amqp.connect(option).then(
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
												return channel.close();
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

module.exports = getMsg;