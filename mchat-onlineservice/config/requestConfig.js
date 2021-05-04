/**
 * 网关所在IP
 */
const GatewayAddress = '172.20.48.87';

/**
 * 网关监听端口
 */
const GatewayPort = 9080;

/**
 * 请求超时时间
 */
const RequestTimeOut = 10 * 1000;

/**
 * axios的配置
 */
const axiosConfig = {
	baseURL: `http://${GatewayAddress}:${GatewayPort}`,
	timeout: RequestTimeOut
};

module.exports = axiosConfig;
