var express = require('express');
var RoomController = require('./RoomController');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.json()); 

var roomController = new RoomController();
require('./router')(app, roomController);

var port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
	res.send({ express: 'Hello From Express' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));