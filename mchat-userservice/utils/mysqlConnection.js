// 返回mysql连接对象
var mysql = require("mysql");

var options = {
	host: "127.0.0.1",
	port: 3306,
	user: "root",
	password: "yingziairen",
	database: "mchat"
}

var connection = mysql.createConnection(options);
connection.connect();

module.exports = connection;