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
		this.getStatusString = this.getStatusString.bind(this);
		this.state = {
			id: 0,
			name: "",
			partnerId: null,
			partnerName: "",
			messageLog: [],
			status: "",
			usernameEntered: false
		}
	}

	enterChat(event) {
		event.preventDefault();
		const username = this._nameInput.value;
		if (username.length === 0) {
			alert("Please enter a username.");
		}
		else {
	    const self = this;
	    socket.emit('userJoined', { name: username }, function (userId, partnerId, partnerName) {
	    	var status;
	    	if (partnerId === null) {
					status = self.getStatusString("");
	    	}
	    	else {
	    		status = self.getStatusString(partnerName);
	    	}
	    	self.setState({
					id: userId,
					name: username,
					partnerId: partnerId,
					partnerName: partnerName,
					status: status,
					usernameEntered: true
				});
	    });

	    this._nameInput.value = "";
		}

		this._nameInput.focus();
	}

	sendMessage(event) {
		event.preventDefault();
		const text = this._messageInput.value;
		if (text.length !== 0) {
			socket.emit('messageSent', { messageText: text, senderId: this.state.id });
			this.addMessage(this.state.name + " (you): " + text);
			this._messageInput.value = "";
		}
	}

	addMessage(text) {
		const messageLog = this.state.messageLog;
		messageLog.push(text);
		this.setState({
			messageLog: messageLog
		});
	}

	getStatusString(partnerName) {
		if (partnerName.length !== 0) {
			return "Chatting with " + partnerName + "!";
		}
		else {
			return "Waiting for a partner...";
		}
	}

	render() {

		// Listen for events from server
		const self = this;
		socket.once('messageReceived', function(data) {
			self.addMessage(self.state.partnerName + ": " + data.messageText);
		});

		socket.on('userPaired', function(data) {
			var status = self.getStatusString(data.partnerName);
			self.setState({
				partnerName: data.partnerName,
				partnerId: data.partnerId,
				status: status
			});
		});

		const textLog = this.state.messageLog.map(function(text) { return (<div>{text}</div>); });

		return (
			<div>
				{!this.state.usernameEntered &&
					<form onSubmit={this.enterChat}>
						<input type="text" placeholder="Username" ref={(a) => this._nameInput = a}></input>
						<input type="submit" value="Enter"></input>
					</form>
				}
				<div>{this.state.status}</div>
				{this.state.partnerId !== null &&
					<div>
						<div>{textLog}</div>
						<LogWindow />
						<form onSubmit={this.sendMessage}>
							<input type="text" ref={(a) => this._messageInput = a}></input>
							<input type="submit" value="Send"></input>
						</form>
					</div>
				}
			</div>
		);
	}

}

export default ChatScreen;