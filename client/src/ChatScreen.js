import React from 'react';
import ReactDOM from 'react-dom';
import EntryPopup from './EntryPopup';
import LogWindow from './LogWindow';

const io = require('socket.io-client');
const socket = io();

class ChatScreen extends React.Component {

	constructor(props) {
		super(props);
		this.enterChat = this.enterChat.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
		this.addMessage = this.addMessage.bind(this);
		this.state = {
			id: 0,
			name: "",
			partnerId: 0,
			partnerName: "",
			messageLog: []
		}
		//this.state = { endpoint: 'http://98.116.173.239:5000' };
		//this.io = socketIOClient(constants.HOST);
	}

	enterChat(event) {
		event.preventDefault();
		const username = this._nameInput.value;
		if (username.length === 0) {
			alert("Please enter a username.");
		}
		else {
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
	    socket.emit('userJoined', { name: username }, function (userId, partnerId, partnerName) {
	    	if (partnerId === null) {
					//self._status.value = "hold up, wait for someone else to join";
					alert("hold up");
	    	}
	    	self.setState({
					id: userId,
					name: username,
					partnerId: partnerId,
					partnerName: partnerName
				});
	    });

	    this._nameInput.value = "";
		}

		this._nameInput.focus();
	}

	/*componentDidMount() {
		const { endpoint } = this.state;
		//const socket = socketIOClient(endpoint);
		socket.on('connection', function(client) {
			console.log("MOUNT: Connection from " + client.id);
		});
	}*/

	sendMessage(event) {
		event.preventDefault();
		const text = this._messageInput.value;
		//const io = socketIOClient(constants.HOST);
		if (text.length !== 0) {
			socket.emit('messageSent', { messageText: text, senderId: this.state.id });
			this.addMessage("you: " + text);
		}
	}

	addMessage(text) {
		const messageLog = this.state.messageLog;
		messageLog.push(text);
		this.setState({
			messageLog: messageLog
		});
	}

	render() {
		//const io = socketIOClient(constants.HOST);

		/*socket.on('connection', function(client) {
			console.log("Connection from " + client.id);
		});*/
		const self = this;
		console.log("the id is " + socket.id);
		socket.on('messageReceived', function(data) {
			console.log("hey hey hey we got a message");
			self.addMessage("message received: " + data.messageText);
		});
		/*socket.on('message', function(message) {
			console.log("hey hey hey we got a message");
			self.addMessage(message);
		});*/

		const textLog = this.state.messageLog.map(function(text) { return (<div>{text}</div>); });

		return (
			<div>
				<form onSubmit={this.enterChat}>
					<input type="text" placeholder="Username" ref={(a) => this._nameInput = a}></input>
					<input type="submit" value="Enter"></input>
				</form>
				<div ref={(a) => this._status = a}></div>
				<div>
					<div>{textLog}</div>
					<LogWindow />
					<form onSubmit={this.sendMessage}>
						<input type="text" ref={(a) => this._messageInput = a}></input>
						<input type="submit" value="Send"></input>
					</form>
				</div>
			</div>
		);
	}

}

export default ChatScreen;