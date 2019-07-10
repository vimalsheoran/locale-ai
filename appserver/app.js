// Dependency import
const app = require("express")();
const config = require("../config")
const bodyParser = require("body-parser");
const http = require("http").createServer(app);
const port = config.APP_PORT;
const io = require("socket.io")(http);
const MsgHandler = require("./utils/queueService").MsgHandler;
const SocketHandler = require("./utils/socketService").SocketHandler;
const RedisClient = require("./utils/cacheService").RedisClient;

// Dependency intialization
const msgHandler = new MsgHandler();
const socketHandler = new SocketHandler();
const redisClient = new RedisClient();

// Middleware usage
app.use(bodyParser.json());

// Handlers
app.post("/data", (req, res) => {
	let {data, clientId} = req.body;
	msgHandler.loadDataToQueue(data, clientId);
	SocketHandler.sendFeedback(clientId, "request is processing", "httpFeedback"); 
	res.send("request_compelete");
});

app.get("/debug", (req, res) => {
	msgHandler.getDataFromQueue();
	res.send("Done");
})

// Run server
http.listen(port, () => {
	msgHandler.initializeQueue();
	socketHandler.intializeSockets(io);
	redisClient.initialize();
	console.log(`Server started on ${port}.`);
});