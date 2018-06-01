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
		var newUser = roomController.addUser(data.name, client.id);
		//var newUser = roomController.addUser(data.name);
		var partnerName;
		if (newUser.partnerId !== null) {
			partnerName = roomController.room.activeUsers[newUser.partnerId].name;
		}
		console.log("JOINED CHAT: " + client.id);
		callback(newUser.id, newUser.partnerId, partnerName);
	});
	self = client;
	client.on('messageSent', function(data) {
		//roomController.handleMessageSent(data.messageText, data.senderId, self);
		console.log("SENT MESSAGE: " + client.id);
		console.log("handling sent message " + data.messageText + " from " + roomController.room.activeUsers[data.senderId].name + "...");
		var recipientId = roomController.room.activeUsers[data.senderId].partnerId;
		console.log("...to " + roomController.room.activeUsers[recipientId].name);
		//io.broadcast.to(recipientId).emit('messageReceived', { 'messageText': text });
		////self.broadcast.to(recipientId).emit('messageReceived', { 'messageText': data.messageText });
		////self.broadcast.to(recipientId).emit('message', data.messageText);
		io.to(recipientId).emit('messageReceived', { 'messageText': data.messageText });
		//self.emit('messageReceived', { 'messageText': data.messageText });
	});
	client.on('disconnect', function () {
		console.log('client disconnect...', client.id);
		//handleDisconnect();
	});
});

//io.on('messageSent', roomController.handleMessage(data.messageText));
io.on('messageSent', function(data) { roomController.handleMessage(data.messageText)});

var port = process.env.PORT || 5000;

http.listen(port, () => console.log(`Listening on port ${port}`));