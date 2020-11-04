// 用户服务
var express = require('express');
var router = express.Router();
var {execute} = require("../utils/mysqlUtil");
/**
 * 系统统一响应类
 */
var Response = require("../utils/response");

/**
 * 根据uid与pwd获取用户信息
 */
router.post("/findUser", (req, res, next) => {
	const {uid, pwd} = req.body;
	var sql = `SELECT * FROM user_info as uInfo where uInfo.UID = ${uid} AND uInfo.Pwd = ${pwd}`;
	execute(sql).then(resp => {
		res.json(Response.success("", resp));
	}, error => {
		res.json(Response.error(error));
	});
});

/**
 * 注册用户
 */
router.post("/register", (req, res, next) => {
	// 注册暂时先这样处理
	const {uid, nickName, pwd} = req.body;
	var sql = `INSERT INTO user_info(UID, NickName, Pwd) VALUES(?, ?, ?)`;
	execute(sql, [uid, nickName, pwd]).then(resp => {
		res.json(Response.success());
	}, error => {
		res.json(Response.error(error));
	})
})

module.exports = router;