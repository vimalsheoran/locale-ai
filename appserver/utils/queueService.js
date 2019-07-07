const RedisMSQ = require("rsmq");
const msgQ = new RedisMSQ({
	"host": "localhost", 
	"port": 6379, 
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
	
	this.loadDataToQueue = (tasks) => {
		try {
			if(!this.queueName) throw "Message queue not initialized, cannot process.";
			// Adds all tasks to the queue asynchronously
			for (let task of tasks) {
				msgQ.sendMessage({
					qname: this.queueName,
					message: JSON.stringify(task)
				}, (err, resp) => {
					// To add a socket event here
					if (err) throw "Unable to add data to queue";
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
				// Add some sort of retry since, a read from queue has failed
				// No feedback to client required
				// Throwing error for now
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