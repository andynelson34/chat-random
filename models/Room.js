//require('./User');
module.exports = class Room {

	constructor() {
		this.activeUsers = {}; // or user pairs??? when you change partners the user ctrlr shouldn't have to update the Room model
		//this.queuedUser = {}; // what if you /hop and there aren't any avail? need multiple queue
		this.queue = [];
		this.nextId = 0; // auto-generated user id, incremented by 1 each time we add a user
	}

	getNewId() {
		var id = this.nextId;
		this.nextId++;
		return id;
	}
}
