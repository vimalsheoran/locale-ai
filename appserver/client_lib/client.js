const axios = require("axios");
const uuid = require("uuid/v4");
const socket = require("socket.io-client");

function Client(server) {

	this.server = server;
	Client.clientId = uuid();
	Client.socket = socket(server);

	this.channels = {
		"feedback": `${this.socketId}_feedback`
	}

	this.sendData = async (endpoint, payload) => {
		try {
			let response = await axios.post(
				`${this.server}${endpoint}`, 
				{"data": payload, "clientId": Client.clientId}
			);
			return response.data;
		} catch (err) {
			throw err;
		}
	}

	this.listenOnSocket = async () => {
		Client.socket.on("httpFeedback", (msg) => console.log(msg));
	}
}

function InitClient() {
	return new Promise((res, rej) => {
		Client.socket.emit("init", Client.clientId);
		setTimeout(() => {
			res();
		}, 2000);
	})
}

module.exports = {
	"Client": Client,
	"InitClient": InitClient
}