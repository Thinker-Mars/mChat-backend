/**
 * 此服务在网关中的唯一ID
 */
const ServiceID = '2';

/**
 * 设置服务信息时的基础url
 */
const ServiceConfigAddr = 'apisix/admin/services';

/**
 * 设置服务消费者信息时的基础url
 */
const ConsumerConfigAddr = 'apisix/admin/consumers';

/**
 * 此服务启动端口
 */
const ServicePort = 3000;

/**
 * 服务权重
 */
const ServiceWeight = 1;

/**
 * 服务的描述
 */
const ServiceDesc = 'Msg Center Service';

/**
	* 外网调用接口时需传递此key
	*/
const ConsumerKey = 'msgcenter';

/**
	* 设置服务信息时的apikey
	*/
const ApiKey = 'mchat';

module.exports.ServiceID = ServiceID;
module.exports.ServiceConfigAddr = ServiceConfigAddr;
module.exports.ServicePort = ServicePort;
module.exports.ServiceWeight = ServiceWeight;
module.exports.ServiceDesc = ServiceDesc;
module.exports.ConsumerKey = ConsumerKey;
module.exports.ConsumerConfigAddr = ConsumerConfigAddr;
module.exports.ApiKey = ApiKey;
