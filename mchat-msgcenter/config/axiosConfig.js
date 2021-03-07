/**
 * gateway地址
 */
const gatewayAddr = require('./gatewayConfig');

/**
 * axios的配置
 */
const requestConfig = {
	baseURL: gatewayAddr,
	timeout: 10000,
	headers: {
		// "apikey": "superSecretAPIKey", // 访问api需要
		'X-API-KEY': 'mchat' // 访问控制台api需要
	}
};

module.exports = requestConfig;
