const { Bucket, TmpBucket, Region, SecretId, SecretKey, DurationSeconds } = require('../config/cosConfig');

const COS = require('cos-nodejs-sdk-v5');
const STS = require('qcloud-cos-sts');

/**
 * 获取图片URL
 * @param {string} key 图片名
 */
function getObjectUrl(key) {
	return new Promise((resolve, reject) => {
		const cos = new COS({ SecretId, SecretKey });
		cos.getObjectUrl(
			{ Bucket, Region, Key: key },
			(err, data) => {
				if (err) {
					reject(err);
				} else {
					const { Url } = data;
					resolve(Url);
				}
			}
		);
	});
}

/**
 * 批量获取图片URL
 * @param {array} keys 图片名
 */
function batchGetObjectUrl(keys) {
	return new Promise((resolve, reject) => {
		const cos = new COS({ SecretId, SecretKey });
		function fetch(key) {
			return new Promise((resolve, reject) => {
				cos.getObjectUrl(
					{ Bucket, Region, Key: key },
					(err, data) => {
						if (err) {
							console.log(err);
							reject({ err, key });
						} else {
							const { Url } = data;
							resolve({ key, url: Url });
						}
					}
				);
			});
		}
		const allFetch = [];
		keys.forEach((key) => {
			allFetch.push(fetch(key));
		});
		Promise.allSettled(allFetch).then(
			(res) => {
				const fetchResult = {};
				res.forEach((data) => {
					const { status, value, reason } = data;
					if (status === 'fulfilled') {
						const { key, url } = value;
						fetchResult[key] = url;
					} else {
						const { err, key } = reason;
						console.log(err);
						fetchResult[key] = '';
					}
				});
				resolve(fetchResult);
			}
		);
	});
}

/**
 * 获取临时密钥
 * @param {string} folder 要访问的文件夹
 */
function getCredential(folder) {
	return new Promise((resolve, reject) => {
		const allowActions = [
			// 简单上传
			'name/cos:PutObject',
			'name/cos:PostObject',
			// 分片上传
			'name/cos:InitiateMultipartUpload',
			'name/cos:ListMultipartUploads',
			'name/cos:ListParts',
			'name/cos:UploadPart',
			'name/cos:CompleteMultipartUpload'
		];
		const uid = TmpBucket.substring(1 + TmpBucket.lastIndexOf('-'));
		/**
		 * 权限列表请看 https://cloud.tencent.com/document/product/436/31923
		 */
		const policy = {
			'version': '2.0',
			'statement': [{
				'action': allowActions,
				'effect': 'allow',
				'principal': { 'qcs': ['*'] },
				'resource': [
					`qcs::cos:${Region}:uid/${uid}:${TmpBucket}/${folder}/*`
				]
			}]
		};
		STS.getCredential(
			{
				secretId: SecretId,
				secretKey: SecretKey,
				durationSeconds: DurationSeconds,
				policy: policy
			},
			function(err, tempKeys) {
				if (err) {
					reject(err);
				} else {
					resolve(tempKeys);
				}
			});
	});
}

/**
 * 将临时桶中的文件移动到正式桶
 * @param {string} oldKey 临时对象在桶中的路径 格式如：register-image/default.jpg
 * @param {string} newKey 对象在正式桶中的名称
 */
function moveTempBacketObject(oldKey, newKey) {
	return new Promise((resolve, reject) => {
		const cos = new COS({ SecretId, SecretKey });
		const copySource = `${TmpBucket}.cos.${Region}.myqcloud.com/${encodeURIComponent(oldKey)}`;
		cos.putObjectCopy(
			{
				Bucket,
				Region,
				Key: newKey,
				CopySource: copySource
			},
			(err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			}
		);
	});
}

/**
 * 删除临时桶中的对象
 * @param {string} key 图片名称
 */
// function deleteTempBacketObject(key) {
// 	return new Promise((resolve, reject) => {
// 		const cos = new COS({ SecretId, SecretKey });
// 		cos.deleteObject(
// 			{
// 				Bucket: TmpBucket,
// 				Region: Region,
// 				Key: key
// 			},
// 			(err, data) => {
// 				if (err) {
// 					reject(err);
// 				} else {
// 					resolve();
// 				}
// 			}
// 		);
// 	});
// }

module.exports.getObjectUrl = getObjectUrl;
module.exports.batchGetObjectUrl = batchGetObjectUrl;
module.exports.getCredential = getCredential;
module.exports.moveTempBacketObject = moveTempBacketObject;
