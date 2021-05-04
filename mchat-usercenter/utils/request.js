const axios = require('axios');
const requestConfig = require('../config/requestConfig');

class Request {
	constructor() {
		this.axios = axios.create(requestConfig);
		this.initAxios();
	}

	initAxios() {
		// 请求拦截器
		this.axios.interceptors.request.use(
			config => {
				return config;
			},
			error => {
				return Promise.reject(error);
			}
		);
		// 响应拦截器
		this.axios.interceptors.response.use(
			res => {
				return res.data;
			},
			error => {
				return Promise.reject(error.response.data);
			}
		);
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
			);
		});
	}

	put(url, data) {
		return new Promise((resolve, reject) => {
			this.axios.put(url, data).then(
				res => {
					resolve(res);
				},
				err => {
					reject(err);
				}
			);
		});
	}

	get(url) {
		return new Promise((resolve, reject) => {
			this.axios.get(url).then(
				res => {
					resolve(res);
				},
				err => {
					reject(err);
				}
			);
		});
	}

	patch(url, data) {
		return new Promise((resolve, reject) => {
			this.axios.patch(url, data).then(
				res => {
					resolve(res);
				},
				err => {
					reject(err);
				}
			);
		});
	}
}

module.exports = new Request();
