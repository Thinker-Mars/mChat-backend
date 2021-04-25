// 用户服务
const express = require('express');
const router = express.Router();
const { execute } = require('../utils/mysqlUtil');
/**
 * 系统统一响应类
 */
const Response = require('../utils/response');

/**
 * 用户登录
 */
router.post('/login', (req, res, next) => {
	const { uid, password } = req.body;
	const sql = `SELECT * FROM userinfo WHERE userinfo.Uid = ${uid} AND userinfo.Password = '${password}'`;
	execute(sql).then((resp) => {
		const length = Object.keys(resp).length;
		if (length === 1) {
			res.json(Response.success());
		} else {
			res.json(Response.error('账号密码错误'));
		}
	})
})

/**
 * 根据uid与pwd获取用户信息
 */
router.post('/findUser', (req, res, next) => {
	const { uid, pwd } = req.body;
	const sql = `SELECT * FROM user_info as uInfo where uInfo.UID = ${uid} AND uInfo.Pwd = ${pwd}`;
	execute(sql).then(resp => {
		res.json(Response.success('', resp));
	}, error => {
		res.json(Response.error(error));
	});
});

/**
 * 注册用户
 */
router.post('/register', (req, res, next) => {
	// 注册暂时先这样处理
	const { uid, nickName, pwd } = req.body;
	const sql = 'INSERT INTO user_info(UID, NickName, Pwd) VALUES(?, ?, ?)';
	execute(sql, [uid, nickName, pwd]).then(resp => {
		res.json(Response.success());
	}, error => {
		res.json(Response.error(error));
	});
});

module.exports = router;
