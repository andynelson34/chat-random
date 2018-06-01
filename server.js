var express =  require('express');
var app = express();
var http = require('http').Server(app);
var RoomController = require('./RoomController');
var io = require('socket.io')(http);

app.use(express.json());

var roomController = new RoomController();
require('./router')(app, roomController);

io.on('connection', function (client) {
	//client.on('message', handleMessage);
	console.log('client connected: ' + client.id);
	client.on('userJoined', function(data, callback) {
		//var newUser = roomController.addUser(data.name, client.id);
		var newUser = roomController.addUser(data.name);
		callback(newUser.partnerId);
	});
	client.on('messageSent', function(data) {roomController.handleMessageSent(data.messageText, sender.id, io)});
	client.on('disconnect', function () {
		console.log('client disconnect...', client.id);
		//handleDisconnect();
	});
});

//io.on('messageSent', roomController.handleMessage(data.messageText));
io.on('messageSent', function(data) { roomController.handleMessage(data.messageText)});

var port = process.env.PORT || 5000;

http.listen(port, () => console.log(`Listening on port ${port}`));