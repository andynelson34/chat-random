import React from 'react';
import ReactDOM from 'react-dom';
import EntryPopup from './EntryPopup';
import LogWindow from './LogWindow';

const io = require('socket.io-client');
const socket = io();

class ChatScreen extends React.Component {

	constructor(props) {
		super(props);
		this.sendMessage = this.sendMessage.bind(this);
		//this.state = { endpoint: 'http://98.116.173.239:5000' };
		//this.io = socketIOClient(constants.HOST);
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
			socket.emit('messageSent', { messageText: text });
		}
	}

	render() {

		//const io = socketIOClient(constants.HOST);

		/*socket.on('connection', function(client) {
			console.log("Connection from " + client.id);
		});*/

		return (
			<div>
				<EntryPopup />
				<LogWindow />
				<form onSubmit={this.sendMessage}>
					<input type="text" ref={(a) => this._messageInput = a}></input>
					<input type="submit" value="Send"></input>
				</form>
			</div>
		);
	}

}

export default ChatScreen;