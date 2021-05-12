/**
 * mysql工具
 */

const mysql = require('mysql');

/**
 * 构造连接池配置对象
 */
const poolConfig = {
	// host: '172.20.48.88',
	host: '127.0.0.1',
	port: 3306,
	user: 'root',
	// password: 'yingziairen1a2Z',
	password: 'yingziairen',
	database: 'mchat',
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
	acquireTimeout: 10 * 1000
};

/**
 * 创建连接池
 */
const pool = mysql.createPool(poolConfig);

/**
 * 执行sql
 * @param {*} sql
 * @param {*} param
 */
function execute(sql, param) {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject(err);
			} else {
				connection.query(sql, param, (error, results, fields) => {
					if (error) {
						reject(error);
						connection.release();
					} else {
						resolve(results);
						connection.release();
					}
				});
			}
		});
	});
}

module.exports.execute = execute;
