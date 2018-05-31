var Room = require('./models/Room');
var User = require('./models/User');

module.exports = class RoomController {

	constructor() {
		this.room = new Room();
	}

	pairUsers(user1, user2) {
		user1.setPartner(user2);
		user2.setPartner(user1);
	}

	unpairUsers(user1, user2) {
		user1.setPartner(null);
		user2.setPartner(null);
	}

	addUser(newUserData) {
		var newUser = new User(newUserData.name, this.room.getNewId());
		if (this.room.queue.length === 0) {
			this.room.queue.push(newUser);
		}
		else {
			var newPartner = this.room.queue[0];
			this.pairUsers(newUser, newPartner);

			this.room.queue.shift();
			this.room.activeUsers.push(newUser);
			this.room.activeUsers.push(newPartner);
		}

		return newUser;
	}

}