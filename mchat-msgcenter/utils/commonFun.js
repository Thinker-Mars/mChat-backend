const os = require("os");
const moment = require("moment");
const Request = require("./request");
const { SERVICE_ID, SERVICE_BASE_URL, SERVICE_PORT } = require("../config/serviceConfig");

/**
 * 获取IP
 */
function getIP() {
    let interfaces = os.networkInterfaces();
    for (let type in interfaces) {
        let netInfos = interfaces[type];
        for (let i = 0; i < netInfos.length; i++) {
            let netInfo = netInfos[i];
            if (netInfo.family === "IPv4" && netInfo.address !== "127.0.0.1" && !netInfo.internal) {
                return netInfo.address;
            }
        }
    }
}

/**
 * 获取服务信息
 * @param {Number} id 服务唯一ID
 */
function getService(id) {
    let url = SERVICE_BASE_URL + id;
    return Request.get(url);
}

/**
 * 服务启动之后，向网关注册服务
 */
function registerService() {

    // 生成此服务的地址：ip:port
    const addr = getIP() + ":" + SERVICE_PORT;

    // 生成向网关发起请求的url
    const url = SERVICE_BASE_URL + SERVICE_ID;

    // 生成当前时间
    const time = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

    // 先判断是否已有相关服务存在
    getService(SERVICE_ID).then(
        res => {
            // 已有服务注册，更新服务注册信息
            let node = {};
            node[addr] = 1;
            let newNodes = Object.assign(res.node.value.nodes, node);
            let data = {
                nodes: newNodes
            };
            Request.patch(url, data).then(
                () => {
                    console.log(`[消息中心服务]注册成功: ${addr} ${time}`);
                },
                err => {
                    console.log(err,`[消息中心服务]注册失败 ${time}`);
                }
            )
        },
        () => {
            // 目前尚无服务注册
            let nodes = {};
            nodes[addr] = 1;
            let data = {
                type: "roundrobin",
                nodes
            };
            Request.put(url, data).then(
                () => {
                    console.log(`[消息中心服务]注册成功: ${addr} ${time}`);
                },
                err => {
                    console.log(err, `[消息中心服务]注册失败 ${time}`);
                }
            )
        }
    );
}

module.exports.registerService = registerService;