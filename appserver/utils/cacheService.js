const redis = require("redis");

function RedisClient() {
	
	RedisClient.client;
	
	this.initialize = () => {
		RedisClient.client = redis.createClient();
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