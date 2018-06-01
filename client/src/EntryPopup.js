import React from 'react';
import ReactDOM from 'react-dom';

const io = require('socket.io-client');
const socket = io();

class EntryPopup extends React.Component {

	constructor(props) {
		super(props);
		this.enterChat = this.enterChat.bind(this);
	}

	enterChat = async (event) => {
		event.preventDefault();
		const username = this._nameInput.value;
		if (username.length === 0) {
			alert("Please enter a username.");
		}
		else {
			// TODO: use a socket event instead of api call
			/*const response = await fetch('/api/users', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					'name': username
				})
			});
    	const body = await response.json();

	    if (response.status !== 200) throw Error(body.message);
	    if (body.partnerId === null) {
	    	alert("hold up, wait for someone else to join");
	    }*/
	    const self = this;
	    socket.emit('userJoined', { name: username }, function (partnerId) {
	    	if (partnerId === null) {
					//self._status.value = "hold up, wait for someone else to join";
					alert("hold up");
	    	}
	    });

	    this._nameInput.value = "";
		}

		this._nameInput.focus();
	}

	render() {
		return (
			<div>
				<form onSubmit={this.enterChat}>
					<input type="text" placeholder="Username" ref={(a) => this._nameInput = a}></input>
					<input type="submit" value="Enter"></input>
				</form>
				<div ref={(a) => this._status = a}></div>
			</div>
		);
	}

}

export default EntryPopup;