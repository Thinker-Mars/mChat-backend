let {RES_CODE} = require("../constants/code-constant");

/**
 * 响应类
 * 目前只提供两个静态方法
 * 可通过 Response.success()调用
 */
class Response {
	
	constructor() {}

	static success(msg = "", data = "") {
		return {
			code: RES_CODE.SUCCESS,
			msg,
			data
		}
	}

	static error(msg = "", data = "") {
		return {
			code: RES_CODE.ERROR,
			msg,
			data
		}
	}
}


module.exports = Response;