/**
 * gateway地址
 */
const gatewayAddr = require("./gatewayConfig");

/**
 * axios的配置
 */
const requestConfig = {
	baseURL: gatewayAddr,
	timeout: 10000,
	headers: {
		"apikey": "superSecretAPIKey", // 访问api需要
		"x-api-key": "edd1c9f034335f136f87ad84b625" // 访问控制台api需要
	}
};

module.exports = requestConfig;
