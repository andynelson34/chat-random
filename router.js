module.exports = function(app, controller) {

	app.get('/users', function(req, res) {
		res.send({ express: 'some users' });
	});

	app.get('/users/:id', function(req, res) {

	});

	app.post('/users/', function(req, res) {
		var newUser = controller.addUser(req);
		res.send(newUser);
	});

	app.put('/users/:id', function(req, res) {

	});

	app.delete('/users/:id', function(req, res) {

	});

	app.post('message', function(req, res) {
		// endpt for sending message - req has sender, recipient, text

	});
};