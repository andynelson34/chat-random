var Room = require('./models/Room');
var User = require('./models/User');


module.exports = class RoomController {

	constructor() {
		this.room = new Room();
	}

	getUser(id) {
		if (this.room.activeUsers[id] !== undefined) {
			return this.room.activeUsers[id];
		}

		var user = this.room.queue.find(user => user.id == id);
		if (user !== undefined) {
			return user;
		}
		else {
			return "User id not found";
		}
	}

	pairUsers(user1, user2) {
		user1.setPartnerId(user2.id);
		user2.setPartnerId(user1.id);
	}

	unpairUsers(user1, user2) {
		user1.setPartnerId(null);
		user2.setPartnerId(null);
	}

	//addUser(name) {
	addUser(name, id) {
		//var newUser = new User(name, this.room.getNewId());
		var newUser = new User(name, id);
		if (this.room.queue.length === 0) {
			this.room.queue.push(newUser);
		}
		else {
			var newPartner = this.room.queue[0];
			this.pairUsers(newUser, newPartner);

			this.room.queue.shift();
			this.room.activeUsers[newUser.id] = newUser;
			this.room.activeUsers[newPartner.id] = newPartner;
		}

		// TODO: socket stuff to tell the other user we've found them a partner

		console.log("BEHOLD THE QUEUE: ");
		for (var i = 0; i < this.room.queue.length; i++) {
			console.log(this.room.queue[i]);
		}
		console.log("BEHOLD THE ACTIVES: ");
		for (var id in this.room.activeUsers) {
			console.log(this.room.activeUsers[id]);
		}
		return newUser;
	}

	deleteUser(id) {
		// for each user in queue: search ban list for this user and delete them
		// for each user in actives: search ban list for this user and delete them
			// If this user is their current partner:
				// do the same partner-matching stuff from addUser
		// Delete this user from wherever they currently are (queue or actives)
	}

	/*sendMessage(senderId, recipientId, text) {
		// TODO: checks for special messages - each should have its own handler funct
	}*/

	/*handleMessageSent(text, senderId, client) {
		console.log("handling sent message " + text + " from " + this.room.activeUsers[senderId].name + "...");
		var recipientId = this.room.activeUsers[senderId].partnerId;
		console.log("...to " + this.room.activeUsers[recipientId].name);
		

		//client.broadcast.to(recipientId).emit('messageReceived', { 'messageText': text });
		//client.emit('messageReceived', { 'messageText': text });
		// Left off here - how to receive it in React??
		//console.log("Here's the text: " + text);
	}*/

}