// Dependency import
const app = require("express")();
const bodyParser = require("body-parser");
const http = require("http").createServer(app);
const port = 5000;
const io = require("socket.io")(http);
const MsgHandler = require("./utils/queueService").MsgHandler;

// Dependency intialization
const msgHandler = new MsgHandler();

// Middleware usage
app.use(bodyParser.json());

// Handlers
app.post("/data", (req, res) => {
	msgHandler.loadDataToQueue(req.body.data); 
	res.send("request_compelete");
});

app.get("/debug", (req, res) => {
	msgHandler.getDataFromQueue();
	res.send("Done");
})

// Socket Handlers
io.on("connection", socket => {
	
	console.log("Connected to client.");
	socket.emit("something", "cool");

	socket.on("cool", message => {
		console.log(message);
		socket.emit("something", "cool");
	});
});

// Run server
http.listen(port, () => {
	msgHandler.initializeQueue();
	console.log(`Server started on ${port}.`);
});

