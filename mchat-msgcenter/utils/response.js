const { RequestCode } = require('../constants/code-constant');

/**
 * 响应类
 * 目前只提供两个静态方法
 * 可通过 Response.success()调用
 */
class Response {
	static success(msg = '', data = '') {
		return {
			code: RequestCode.Success,
			msg,
			data
		};
	}

	static error(msg = '', data = '') {
		return {
			code: RequestCode.Error,
			msg,
			data
		};
	}
}

module.exports = Response;
