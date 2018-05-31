import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ChatScreen from './ChatScreen';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ChatScreen />, document.getElementById('root'));
registerServiceWorker();
