// 用户服务
const express = require('express');
const router = express.Router();
const { execute } = require('../utils/mysqlUtil');
const { getObjectUrl, batchGetObjectUrl, getCredential } = require('../utils/cosHelper');
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
			// 头像标识
			const { Avatar } = resp[0];
			// 获取头像地址
			getObjectUrl(Avatar).then(
				(url) => {
					const userinfo = Object.assign(resp[0], { Avatar: url });
					res.json(Response.success('', { userinfo }));
				},
				(err) => {
					console.log(err);
					const userinfo = Object.assign(resp[0], { Avatar: '' });
					res.json(Response.success('', { userinfo }));
				}
			);
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
		if (Object.keys(resp).length > 0) {
			const avatars = [];
			for (const friendInfo of resp) {
				const { Avatar } = friendInfo;
				avatars.push(Avatar);
			}
			batchGetObjectUrl(avatars).then(
				(imgRes) => {
					for (const friendInfo of resp) {
						const { Avatar } = friendInfo;
						friendInfo.Avatar = imgRes[Avatar];
					}
					res.json(Response.success('', { friendList: resp }));
				}
			);
		} else {
			res.json(Response.success('', { friendList: [] }));
		}
	});
});

/**
 * 获取访问COS的临时密钥
 */
router.get('/getTmpCredential', (req, res, next) => {
	const { folder } = req.query;
	getCredential(folder).then(
		(credential) => {
			res.json(Response.success('', credential));
		},
		(err) => {
			console.log(err);
			res.json(Response.error('获取临时密钥失败'));
		}
	);
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
