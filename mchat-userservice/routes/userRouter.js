// 用户服务
var express = require('express');
var router = express.Router();
var connection = require("../utils/mysqlConnection");

/**
 * 根据uid与pwd获取用户信息
 */
router.post("/findUser", (req, res, next) => {
	const {uid, pwd} = req.body;
	var sql = `SELECT * FROM user_info as uInfo where uInfo.UID = ${uid} AND uInfo.Pwd = ${pwd}`;
	connection.query(sql, (err, results, fields) => {
		if (err) {
			res.json(err);
		} else {
			res.json(results);
		}
	})
});

/**
 * 注册用户
 */
router.post("/register", (req, res, next) => {
	// 注册暂时先这样处理
	const {uid, nickName, pwd} = req.body;
	var sql = `INSERT INTO user_info(UID, NickName, Pwd) VALUES(?, ?, ?)`;
	connection.query(sql, [uid, nickName, pwd], (err, results, fields) => {
		if (err) {
			res.json(err);
		} else {
			res.send("register success");
		}
	})
})

module.exports = router;