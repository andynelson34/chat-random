module.exports = class User {

	constructor(name, id) {
		this.name = name;
		this.id = id;
		this.partner = null;
		this.blockedUsers = [];
	}

	setPartner(partner) {
		this.partner = partner;
	}

}