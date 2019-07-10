const pg = require("pg");
const APP_SERV = "http://localhost:5000"
const socket = require("socket.io-client")(APP_SERV);
const rsmq = require("rsmq");
const MsgQ = new rsmq({"host": "127.0.0.1", "port": 6379});
const consumeFrom = "msg_queue";
const queueScrapeInterval = "500";

// DB Connection details.
process.env.PGHOSTADDR = "127.0.0.1";
process.env.PGDATABASE = "xrides";
process.env.PGUSER = "vimpsykal";
process.env.PGPASSWORD = "Vimal@1998";
process.env.PGPORT = "5432";

const client = new pg.Client();
const addToRides = `INSERT INTO 
rides(
	id, 
	user_id, 
	vehicle_model_id, 
	package_id,
	travel_type_id,
	from_area_id,
	to_area_id,
	from_city_id,
	to_city_id,
	from_date,
	to_date,
	online_booking,
	mobile_site_booking,
	booking_created,
	from_lat,
	from_long,
	to_lat,
	to_long,
	car_cancellation
) VALUES (
	$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19
) RETURNING *`;

const tableKeys = [
	"id",
	"user_id",
	"vehicle_model_id",
	"package_id",
	"travel_type_id",
	"from_area_id",
	"to_area_id",
	"from_city_id",
	"to_city_id",
	"from_date",
	"to_date",
	"online_booking",
	"mobile_site_booking",
	"booking_created",
	"from_lat",
	"from_long",
	"to_lat",
	"to_long",
	"car_cancellation"
];

// const testVals = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"];

const provideFeedback = (type, clientId, packetId) => {
	socket.emit("scraper_feedback", {
		"type": type,
		"clientId": clientId,
		"packetId": packetId
	});
}

const scrapeQueue = () => {
	try {
		MsgQ.popMessage({qname: consumeFrom}, async (err, resp) => {
			if (err || !resp.message) {
				console.log("Unable to read from queue, it might be empty.");
				return;
			}
			let message = JSON.parse(resp.message);
			let valsToAdd = tableKeys.map(i => message[i]);
			try {
				await client.query(addToRides, valsToAdd);
				provideFeedback("success", message.clientId, message.id);
			} catch (err) {
				provideFeedback("failure", message.clientId, message.id);
				console.log(err);
			}
		})
	} catch (err) {
		console.log(err);
	}
}

client.connect()
.then( async () => {
	setInterval(scrapeQueue, queueScrapeInterval);
})
.catch(err => console.log(err));