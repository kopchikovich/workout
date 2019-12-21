import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'
import './index.css'

// make global contoller for app
document.controller = {};

ReactDOM.render(<App />, document.getElementById('root'));