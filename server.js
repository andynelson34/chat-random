var express =  require('express');
var app = express();
var http = require('http').Server(app);
var RoomController = require('./RoomController');
var io = require('socket.io')(http);

app.use(express.json());

var roomController = new RoomController();
require('./router')(app, roomController);

io.on('connection', function (client) {

	console.log('client connected: ' + client.id);
	client.on('userJoined', function(data, callback) {
		var newUser = roomController.addUser(data.name, client.id);
		var partnerName;

		if (newUser.partnerId !== null) {
			partnerName = roomController.room.activeUsers[newUser.partnerId].name;
			// Tell the new user's partner that they're now in a chat
			io.to(newUser.partnerId).emit('userPaired', { 'partnerName': newUser.name, 'partnerId': client.id });
		}
		
		console.log("JOINED CHAT: " + client.id);
		callback(newUser.id, newUser.partnerId, partnerName);
	});

	client.on('messageSent', function(data) {
		var recipientId = roomController.room.activeUsers[data.senderId].partnerId;
		io.to(recipientId).emit('messageReceived', { 'messageText': data.messageText });
	});
	client.on('disconnect', function () {
		console.log('client disconnect...', client.id);
		//handleDisconnect();
	});
});

var port = process.env.PORT || 5000;

http.listen(port, () => console.log(`Listening on port ${port}`));