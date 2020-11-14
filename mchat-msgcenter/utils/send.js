let amqp = require('amqplib');
let option = require("./mqConfig");

let queue = "test-queue1";

function send(msg) {
    return new Promise((resolve, reject) => {
        amqp.connect(option).then(
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

module.exports = send;

