import React from 'react';
import ReactDOM from 'react-dom';

class EntryPopup extends React.Component {

	constructor(props) {
		super(props);
		this.enterChat = this.enterChat.bind(this);
	}

	enterChat(event) {
		var name = this._nameInput;
		if (name.length === 0) {
			alert("Please enter a username.");
		}
		else {
			//do some stuff here
		}
	}

	render() {
		return (
			<form>
				<input type="text" placeholder="Username" ref={(a) => this._nameInput = a}></input>
				<input type="submit" value="Enter"></input>
			</form>
		);
	}

}

export default EntryPopup;