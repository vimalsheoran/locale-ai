const RedisClient = require("./cacheService").RedisClient;

function SocketHandler() {

	SocketHandler.io;

	this.intializeSockets = (io) => {
		try {
			SocketHandler.io = io;
			SocketHandler.io.on("connection", socket => {
				socket.emit("identify", "");
				socket.on("init", message => {
					let userRef = message;
					let socketId = socket.id;
					RedisClient.set(userRef, socketId);
				});
				socket.on("scraper_feedback", msg => {
					SocketHandler.sendScraperFeedback(msg);							
				})
			});
		} catch (err) {
			throw err;
		}
	}
}

SocketHandler.sendFeedback = (client, msg, channel) => {
	try {
		if (!SocketHandler.io) throw "Sockets not initialized.";
		RedisClient.client.get(client, (err, val) => {
			if (err) throw err;
			SocketHandler.io
				.to(val)
				.emit(channel, msg);
		});
	} catch (err) {
		throw err;
	}
}

SocketHandler.sendScraperFeedback = (msg) => {
	try {
		if (!SocketHandler.io) throw "Sockets not initialized.";
		RedisClient.client.get(msg.clientId, (err, val) => {
			if (err) throw err;
			SocketHandler.io.to(val).emit(msg.type, msg.packetId);
		});
	} catch (err) {
		throw err;
	}
}

module.exports = {
	"SocketHandler": SocketHandler
}