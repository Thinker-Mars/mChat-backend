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
	const sql = `SELECT userinfo.Uid, constant.Value as Gender, userinfo.BirthDay,
		userinfo.Avatar, userinfo.Home, userinfo.Motto, userinfo.NickName FROM userinfo
		LEFT JOIN constant ON userinfo.GenderConstant = constant.Id
		WHERE Uid = '${uid}' AND Password = '${password}'`;
	execute(sql).then((resp) => {
		const length = Object.keys(resp).length;
		if (length === 1) {
			res.json(Response.success('', { userinfo: resp[0] }));
		} else {
			res.json(Response.error('账号密码错误'));
		}
	});
});

/**
 * 查询好友列表
 */
router.post('/getFriendList', (req, res, next) => {
	const { uid } = req.body;
	const sql = `SELECT Uid, NickName, friendnote.NoteName, constant.Value as Gender, Avatar, Home, Motto FROM userinfo
		LEFT JOIN constant ON userinfo.GenderConstant = constant.Id
		LEFT JOIN friendnote ON friendnote.UserId = '${uid}' AND userinfo.Uid = friendnote.FriendId
		WHERE userinfo.Uid IN 
	(SELECT FriendId FROM relation WHERE UserId = '${uid}' UNION ALL SELECT UserId FROM relation WHERE FriendId = '${uid}')`;
	execute(sql).then((resp) => {
		res.json(Response.success('', { friendList: resp }));
	});
});

/**
 * 根据uid与pwd获取用户信息
 */
router.post('/findUser', (req, res, next) => {
	const { uid, pwd } = req.body;
	const sql = `SELECT * FROM user_info as uInfo where uInfo.UID = '${uid}' AND uInfo.Pwd = ${pwd}`;
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
