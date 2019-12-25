import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/app'
import makeMessage from './components/message'

// make global contoller for app
document.controller = {};

// message api
document.controller.renderMessage = (text, color) => {

    const TOP_POSITION = 0;
    const TIMEOUT = 3000;
    const container = document.getElementById('message');
    const message = makeMessage(text, color);

    container.appendChild(message);
    // for animation
    setTimeout(() => {
        message.style.top = TOP_POSITION;
    }, 100);
    setTimeout(() => {
        container.removeChild(message);
    }, TIMEOUT);
}

ReactDOM.render(<App />, document.getElementById('root'));