const Client = require("./client").Client;
const SERVER_URL = "http://localhost:5000";
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

const client = new Client(SERVER_URL);
client.sendData("/data", payload)
.then(data => console.log(data))
.catch(err => console.log(err));
