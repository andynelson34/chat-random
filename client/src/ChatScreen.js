import React from 'react';
import ReactDOM from 'react-dom';
import EntryPopup from './EntryPopup';
import LogWindow from './LogWindow';

class ChatScreen extends React.Component {

	constructor(props) {
		super(props);
		this.sendMessage = this.sendMessage.bind(this);
	}

	sendMessage(event) {
		event.preventDefault();
		const text = this._messageInput.value;
		if (text.length === 0) {
			return;
		}
	}

	render() {
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