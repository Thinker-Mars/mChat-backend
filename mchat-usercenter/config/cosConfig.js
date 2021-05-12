/**
 * 存储桶名称
 */
const Bucket = 'mchat-1259375888';

/**
 * 存储桶所在地域
 */
const Region = 'ap-nanjing';

/**
 * SecretId
 * 计算签名需要
 */
const SecretId = 'AKID1rRKzTXEVXJp84qAmBNKXZN4VSAdlFQM';

/**
 * SecretKey
 * 计算签名需要
 */
const SecretKey = 'qPlrhGyTjjUjlW2nLddTG4lMgiV1GXZL';

/**
 * 访问COS的域
 */
const CosHost = 'https://mchat-1259375888.cos.ap-nanjing.myqcloud.com';

module.exports.Bucket = Bucket;
module.exports.Region = Region;
module.exports.CosHost = CosHost;
module.exports.SecretId = SecretId;
module.exports.SecretKey = SecretKey;
