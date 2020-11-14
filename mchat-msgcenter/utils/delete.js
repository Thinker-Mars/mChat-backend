let amqp = require('amqplib');
let option = require("./mqConfig");

function deleteQueue(queue) {
    return new Promise((resolve, reject) => {
        amqp.connect(option).then(
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

module.exports = deleteQueue;