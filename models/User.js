module.exports = class User {

	constructor(name, id) {
		this.name = name;
		this.id = id;
		this.partnerId = null;
		this.blockedUsers = [];
	}

	setPartnerId(id) {
		this.partnerId = id;
	}

}