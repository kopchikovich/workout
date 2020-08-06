import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/app/app'
import makeMessage from './components/message/message'
import * as serviceWorker from './serviceWorker'

// make global contoller for app
document.controller = {}

// message api
document.controller.renderMessage = (text: string, color: string) => {
  const TOP_POSITION: string = '0'
  const TIMEOUT: number = 3000
  const container: HTMLElement | null = document.getElementById('message')
  const message: HTMLElement = makeMessage(text, color)

  if (container) {
    container.appendChild(message)
    // for animation
    setTimeout(() => {
      message.style.top = TOP_POSITION
    }, 100)
    setTimeout(() => {
      container.removeChild(message)
    }, TIMEOUT)
  }
}

// !null when append workout data to firestore
document.controller.workoutAppendPromise = null

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.register()