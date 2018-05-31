module.exports = function(app, controller) {

	app.get('/api/users', function(req, res) {
		res.send({ express: 'some users' });
	});

	app.get('/api/users/:id', function(req, res) {
		//var room = controller.room;
		//var id = req.params.id;
		var result = controller.getUser(req.params.id);
		res.send(result);
		
	});

	app.post('/api/users/', function(req, res) {
		var newUser = controller.addUser(req.body.name);
		res.send(newUser);
	});

	app.put('/api/users/:id', function(req, res) {

	});

	app.delete('/api/users/:id', function(req, res) {

	});

	app.post('/api/message', function(req, res) {
		// endpt for sending message - req has sender, recipient, text
		// use socket here?
		
	});
};