const redis = require("redis");
const config = require("../../config");
const host = config.CACHE_HOST;
const port = config.CACHE_PORT;

function RedisClient() {
	
	RedisClient.client;
	
	this.initialize = () => {
		RedisClient.client = redis.createClient(host, port);
		RedisClient.client.on("error", err => console.log(err));
		console.log("Cache connected.");
	}
}

RedisClient.set = async (key, value) => {
	try {
		if (!RedisClient.client) throw "Not connected to Redis instance.";
		RedisClient.client.set(key, value, err => {
			if (err) throw err;
		});
	} catch (err) {
		throw err;
	}
}

module.exports = {
	"RedisClient": RedisClient
}