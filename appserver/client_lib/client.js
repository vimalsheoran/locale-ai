const axios = require("axios");

function Client(server_url) {
	this.server_url = server_url;

	this.sendData = async (endpoint, payload) => {
		try {
			let response = await axios.post(
				`${this.server_url}${endpoint}`, 
				{"data": payload}
			);
			return response.data;
		} catch (err) {
			throw err;
		}
	}
}

Client.prototype.sendData = async (endpoint, payload) => {

}

module.exports = {
	"Client": Client
}