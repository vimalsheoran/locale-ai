const Client = require("./client").Client;
const config = require("../../config");
const InitClient = require("./client").InitClient;
const port = config.APP_PORT;
const SERVER_URL = `http://localhost:${port}`;
const fs = require("fs");
let payload = [
	{
		"id": "1",
		"user_id": "2",
		"vehicle_model_id": "3",
		"package_id": "4",
		"travel_type_id": "5",
		"from_area_id": "6",
		"to_area_id": "7",
		"from_city_id": "8",
		"to_city_id": "9",
		"from_date": "10",
		"to_date": "11",
		"online_booking": "12",
		"mobile_site_booking": "13",
		"booking_created": "14",
		"from_lat": "15",
		"from_long": "16",
		"to_lat": "17",
		"to_long": "18",
		"car_cancellation": "19"	
	}
]
let rawData = fs.readFileSync((__dirname+"/data.json"));
let jsonData = JSON.parse(rawData);
let i = 0;
const client = new Client(SERVER_URL);

const sendData = () => {
	setInterval( async () => {
		let offset = 10;
		if (i > 150) clearInterval(sendData);
		let dataToSend = jsonData.slice(i, i+offset);
		i += offset;
		let resp = await client.sendData("/data", dataToSend);
		console.log(resp);
	}, 30000);
}

InitClient().then( async () => {
	sendData();
	// setInterval( async () => {
	// 	let resp = await client.sendData("/data", jsonData);
	// 	console.log(resp);
	// }, 30000)
	client.listenOnSocket();
})
.catch(err => console.log(err));