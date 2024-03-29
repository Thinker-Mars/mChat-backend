const redis = require('redis');
const { onlineOptions, socketID2UIDOptions } = require('../config/redisConfig');

/**
 * 操作 [在线用户] 数据库
 */
const onlineClient = redis.createClient(onlineOptions);

/**
 * 操作 [socketID-UID关系] 数据库
 */
const uidRelationClient = redis.createClient(socketID2UIDOptions);

onlineClient.on('error', (error) => {
	console.log(error);
});

uidRelationClient.on('error', (error) => {
	console.log(error);
});

module.exports.onlineClient = onlineClient;
module.exports.uidRelationClient = uidRelationClient;
