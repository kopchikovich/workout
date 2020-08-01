import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './app'
import makeMessage from './components/message'
import * as serviceWorker from './serviceWorker'

// make global contoller for app
document.controller = {}

// message api
document.controller.renderMessage = (text: string, color: string) => {
  const TOP_POSITION: string = '0'
  const TIMEOUT: number = 3000
  const container = document.getElementById('message')
  const message = makeMessage(text, color)

  container.appendChild(message)
  // for animation
  setTimeout(() => {
    message.style.top = TOP_POSITION
  }, 100)
  setTimeout(() => {
    container.removeChild(message)
  }, TIMEOUT)
}

// !null when append workout data to firestore
document.controller.workoutAppendPromise = null

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.register()