import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './app'
import makeMessage from './components/message'
import Local_db from './local-db'
import * as serviceWorker from './serviceWorker'

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

// !null when append workout data to firestore
document.controller.workoutAppendPromise = null;

// testing local db
document.controller.Local_db = Local_db

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();