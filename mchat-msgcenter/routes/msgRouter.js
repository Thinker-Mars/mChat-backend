const express = require('express');
const router = express.Router();

/**
 * MQ工具类
 */
const MQ = require("../utils/mq");

/**
 * 系统统一响应类
 */
const Response = require("../utils/response");

/**
 * 向 [消息中心] 发送消息
 */
router.post('/sendMsg', (req, res, next) => {
	let {queue, msg} = req.body;
	let mq = new MQ();
	mq.sendMsg(queue, msg).then(
		() => {
			res.json(Response.success());
		}
	)
});

/**
 * 从 [消息中心] 获取消息
 */
router.get("/getMsg", (req, res, next) => {
	let {queue} = req.query;
	let mq = new MQ();
	mq.pullMsg(queue).then(
		msg => {
			res.json(Response.success("", msg));
		}
	)
})

module.exports = router;