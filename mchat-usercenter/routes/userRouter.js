// 用户服务
const express = require('express');
const router = express.Router();
const { execute } = require('../utils/mysqlUtil');
const { getObjectUrl, batchGetObjectUrl, getCredential } = require('../utils/cosHelper');
const { generateKey, decrypt, generateUUID, saltEncrypt } = require('../utils/commonFun');
const Response = require('../utils/response');

/**
 * 保存生成的公钥/私钥
 * 公钥-私钥
 */
const rsaKeyMap = new Map();

/**
 * 用户登录
 */
router.post('/login', (req, res, next) => {
	const { Uid, Password, PublicKey } = req.body;
	const sql = `SELECT userinfo.Uid, userinfo.Password, constant.Value as Gender, userinfo.BirthDay,
		userinfo.Avatar, userinfo.Home, userinfo.Motto, userinfo.NickName, userinfo.Salt FROM userinfo
		LEFT JOIN constant ON userinfo.GenderConstant = constant.Id
		WHERE Uid = '${Uid}'`;
	execute(sql).then((resp) => {
		const length = Object.keys(resp).length;
		if (length === 1) {
			// 头像标识
			const { Avatar, Salt } = resp[0];
			const calcPassword = saltEncrypt(Salt, decrypt(rsaKeyMap.get(PublicKey), Password));
			if (calcPassword === resp[0].Password) {
				delete resp[0].Password;
				delete resp[0].Salt;
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
		} else {
			res.json(Response.error('用户不存在'));
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
 * 获取非对称加密的公钥
 */
router.get('/getPublicKey', (req, res, next) => {
	generateKey().then(
		({ publicKey, privateKey }) => {
			rsaKeyMap.set(publicKey, privateKey);
			res.json(Response.success('', publicKey));
		},
		(err) => {
			console.log(err);
			res.json(Response.error('获取公钥失败'));
		}
	);
});

/**
 * 用户注册
 */
router.post('/register', (req, res, next) => {
	const { NickName, Password, Avatar, PublicKey } = req.body;
	// 盐
	const salt = generateUUID();
	// 盐加密后的密码
	const safePassword = saltEncrypt(salt, decrypt(rsaKeyMap.get(PublicKey), Password));
	const registerSql = 'INSERT INTO userinfo(`Password`, GenderConstant, Avatar, NickName, Salt) VALUES (?, ?, ?, ?, ?);';
	execute(registerSql, [safePassword, '1', Avatar, NickName, salt]).then(
		() => {
			const findUidSql = `SELECT Uid FROM userinfo 
			WHERE Avatar = '${Avatar}' AND Salt = '${salt}';`;
			// 获取用户Uid
			execute(findUidSql).then(
				(findRes) => {
					const userLength = Object.keys(findRes).length;
					if (userLength === 1) {
						rsaKeyMap.delete(PublicKey);
						const { Uid } = findRes[0];
						res.json(Response.success('', { Uid }));
					} else {
						res.json(Response.error('获取用户信息失败'));
					}
				},
				(findErr) => {
					console.log(findErr);
					res.json(Response.error('获取用户信息失败'));
				}
			);
		},
		(regErr) => {
			console.log(regErr);
			res.json(Response.error('注册失败'));
		}
	);
});

module.exports = router;
