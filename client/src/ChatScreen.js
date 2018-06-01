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
		socket.on('messageReceived', function(data) {
			console.log("hey hey hey we got a message");
			this.addMessage(data.messageText);
		});

		const textLog = this.state.messageLog.map(function(text) { return (<div>{text}</div>); });

		return (
			<div>
				<EntryPopup />
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