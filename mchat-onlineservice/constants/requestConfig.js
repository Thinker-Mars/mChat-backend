/**
 * axios的config
 */
const requestConfig = {
	baseURL: "http://47.244.232.190:9080",
	timeout: 10000,
	headers: {
		"apikey": "superSecretAPIKey"
	}
};

module.exports = requestConfig;
