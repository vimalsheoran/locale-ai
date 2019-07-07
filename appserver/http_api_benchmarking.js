const axios = require("axios");
const io = require("socket.io-client");
const SERVER_URL = "http://localhost:5000";
// const socket = io(SERVER_URL);

let single_req_object = {
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

const makeSingleRequest = async () => {
	try {
		let jsonArr = [];
		for(let i = 0; i < 200; i++){
			jsonArr.push(single_req_object);
		}
		let jsonString = JSON.stringify(jsonArr);
		let response = await axios({
			method: "post",
			url: `${SERVER_URL}/data`,
			data: jsonString 
		})
	} catch (err) {
		throw err;
	}
}

const recordRequestCompletetionTime = async () => {
	try {
		let startTime = new Date().getTime();
		await makeSingleRequest();
		let timeTaken = new Date().getTime() - startTime;
		console.log(`Time taken to complete request: ${timeTaken} ms`);
		return timeTaken;
	} catch (err) {
		throw err;
	}
}

const crunchMetrics = async () => {
	try {
		let count = 0;
		let collectedTimeMetrics = [];
		let promArr = [];
		while (count < 100){
			setTimeout(() => {
				let promise_ = recordRequestCompletetionTime();
				promArr.push(promise_);
			}, 250);
			count++;
		}
	} catch (err) {
		console.log(err);
	}
}

crunchMetrics().then(data => {
	console.log("Total requests: 100");
	console.log("Request rate: 4 requests per second");
});