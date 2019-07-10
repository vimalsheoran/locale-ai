const RedisMSQ = require("rsmq");
const SocketHandler = require("./socketService").SocketHandler;
const msgQ = new RedisMSQ({
	"host": process.env.CACHE_HOST, 
	"port": process.env.CACHE_PORT, 
	"ns": "rsmq"
});

function MsgHandler () {

	this.queueName = "";

	this.initializeQueue = () => {
		msgQ.listQueues((err, queues) => {
			if (err) throw err;
			if (!queues.length) {
				msgQ.createQueue({qname: "msg_queue"}, (err, fdbck) => {
					if (err) throw err;
					if (!fdbck) throw "Error creating message queue";
				})
			}
			this.queueName = "msg_queue";
			console.log(`Message Queue: ${this.queueName}, Intialized.`);
		});
	}
	
	this.loadDataToQueue = (messages, clientId) => {
		try {
			if(!this.queueName) throw "Message queue not initialized, cannot process.";
			for (let message of messages) {
				message.clientId = clientId;
				msgQ.sendMessage({
					qname: this.queueName,
					message: JSON.stringify(message)
				}, (err, resp) => {
					if (err) {
						SocketHandler.sendFeedback(clientId, message.id, "retry");
					};
				})
			}
		} catch (err) {
			throw err;
		}
	}

	this.getDataFromQueue = () => {
		try {
			if(!this.queueName) throw "Message queue not initialized";
			msgQ.popMessage({qname: "msg_queue"}, (err, resp) => {
				if (err) throw "Error reading from the queue";
				console.log(resp.message);
			});
		} catch (err) {
			throw err;
		}
	}
}

module.exports = {
	"MsgHandler": MsgHandler
}