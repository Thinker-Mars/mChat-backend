/**
 * mysql工具
 */

var mysql = require("mysql");

/**
 * 系统统一响应类
 */
var Response = require("./response");

/**
 * 构造连接池配置对象
 */
var poolConfig = {
	host: "127.0.0.1",
	user: "root",
	password: "yingziairen",
	database: "mchat",
	/**
	 * 最大连接数，默认10
	 */
	connectionLimit: 100,
	/**
	 * 排队最大数量
	 */
	queueLimit: 10,
	/**
	 * 超过最大连接数时排队
	 */
	waitForConnections: true,
	/**
	 * 连接超时时间，默认10s
	 */
	acquireTimeout: 60
}

/**
 * 创建连接池
 */
var pool = mysql.createPool(poolConfig);

/**
 * 执行sql
 * @param {*} sql 
 * @param {*} param 
 */
function execute(sql, param) {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject(Response.error(err));
			} else {
				connection.query(sql, param, (error, results, fields) => {
					if (error) {
						reject(Response.error(error));
					} else {
						resolve(Response.success("", results));
					}
				})
			}
			connection.release();
		})
	})
}

module.exports.execute = execute;