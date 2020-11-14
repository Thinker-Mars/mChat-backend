let amqp = require('amqplib');
let option = require("./mqConfig");

function getMsg(queue) {
    return new Promise((resolve, reject) => {
        amqp.connect(option).then(
            conn => {
                conn.createChannel().then(
                    channel => {
                        let pullMsg = [];
                        function pull(queue) {
                            channel.get(queue, {noAck: true}).then(
                                msg => {
                                    if (msg.content) {
                                        console.log(msg.content.toString());
                                    } else {
                                        console.log("暂无消息");
                                    }
                                }
                            )
                        }
                        if (pull()) {
                            resolve(pullMsg);
                        }
                        // channel.get(queue, {noAck: true}).then(
                        //     msg => {
                        //         if (msg.content) {
                        //             console.log(msg.content.toString());
                        //             getMsg(queue);
                        //         } else {
                        //             console.log("暂无消息");
                        //             resolve();
                        //         }
                        //     }
                        // )
                    }
                )
            }
        )
    })
}

module.exports = getMsg;