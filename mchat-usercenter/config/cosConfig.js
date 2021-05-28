/**
 * 存储桶名称
 */
const Bucket = 'mchat-1259375888';

/**
 * 临时桶
 */
const TmpBucket = 'mchat-tmp-1259375888';

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
 * 临时密钥有效时间
 */
const DurationSeconds = 1800;

module.exports.Bucket = Bucket;
module.exports.TmpBucket = TmpBucket;
module.exports.Region = Region;
module.exports.SecretId = SecretId;
module.exports.SecretKey = SecretKey;
module.exports.DurationSeconds = DurationSeconds;
