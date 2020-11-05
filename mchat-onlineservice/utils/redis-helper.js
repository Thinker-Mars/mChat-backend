let redis = require("redis");
let options = require("../constants/redisConfig");

let redisClient = redis.createClient(options);

redisClient.on("error", (error) => {
	console.log(error);
})

module.exports = redisClient