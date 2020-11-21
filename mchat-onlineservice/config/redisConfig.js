/**
 * 启用数据库0，记录用户在线状态，以UID为key，value可以是登录设备信息、登陆地址、登陆时间等
 * 目的：方便消息发送时判断用户是否在线
 */
let onlineOptions = {
	host: "127.0.0.1",
	port: 6379,
	db: 0
}

/**
 * 启用数据库1，记录socketID与UID的关系，以socketID为key，value是UID
 * 目的：方便用户下线时根据socketID查找UID，清除db0中的记录
 */
let socketID2UIDOptions = {
	host: "127.0.0.1",
	port: 6379,
	db: 1
}

module.exports.onlineOptions = onlineOptions;
module.exports.socketID2UIDOptions = socketID2UIDOptions;