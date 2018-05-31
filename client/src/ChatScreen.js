import React from 'react';
import ReactDOM from 'react-dom';
import EntryPopup from './EntryPopup';

class ChatScreen extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<EntryPopup />
		);
	}

}

export default ChatScreen;