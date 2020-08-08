import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import './index.css'
import App from './components/app/app'
import makeMessage from './components/message/message'
import * as serviceWorker from './serviceWorker'
import { store } from './store/store'
import { mapStateToProps } from './store/initialState'

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

const ConectedApp = connect(mapStateToProps)(App)
ReactDOM.render(
  <Provider store={store}>
    <ConectedApp />
  </Provider>,
  document.getElementById('root'))

serviceWorker.register()