const axios = require("axios");
const requestConfig = require("../config/requestConfig");

class Request {

	constructor() {
		this.axios = axios.create(requestConfig);
	}

	post(url, data) {
		return new Promise((resolve, reject) => {
			this.axios.post(url, data).then(
				res => {
					resolve(res);
				},
				err => {
					reject(err);
				}
			)
		})
	}


}

module.exports = new Request();