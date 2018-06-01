var express =  require('express');
var app = express();
var http = require('http').Server(app);
var RoomController = require('./RoomController');
var io = require('socket.io')(http);

app.use(express.json());

var roomController = new RoomController();
require('./router')(app, roomController);

io.on('connection', function (client) {
	client.on('message', handleMessage);
	client.on('disconnect', function () {
		console.log('client disconnect...', client.id);
		//handleDisconnect();
	});
});

var port = process.env.PORT || 5000;

http.listen(port, () => console.log(`Listening on port ${port}`));