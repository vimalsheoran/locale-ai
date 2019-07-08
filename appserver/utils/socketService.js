function SocketHandler() {

	this.io;

	this.intializeSockets = (io) => {
		try {
			this.io = io;
			io.on("connection", socket => {
				socket.on("init", message => {
					let userRef = message;
					let socketId = socket.id;
					// implement caching in redis
				});
			});
		} catch (err) {
			throw err;
		}
	}

	this.sendFeedback = (client, msg, channel) => {
		try {
			if (!this.io) throw "Sockets not initialized.";
			// let clientSocket = someRedisOperation(client);
			this.io.to(clientSocket).emit(channel, msg);
		} catch (err) {
			throw err;
		}
	}
}

module.exports = {
	"SocketHandler": SocketHandler
}