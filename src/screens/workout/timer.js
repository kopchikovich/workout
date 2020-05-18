import React, { Component } from 'react'
import './timer.css'

class Timer extends Component {

  initialState = {
    minutes: this.props.minutes? this.props.minutes : '00',
    seconds: this.props.seconds? this.props.seconds : '00'
  }
  state = this.initialState

  render() {
    return (
      <div className='timer__time'>
        <span className='timer__minutes'>
          {this.state.minutes}
        </span>
        :
        <span className='timer__seconds'>
          {this.state.seconds}
        </span>
      </div>
    )
  }

  tick() {
    let minutes = +this.state.minutes
    let seconds = +this.state.seconds
    seconds++
      if (seconds === 60) {
        seconds = 0
        minutes++
      }
      if (minutes === 60) minutes = 0
    this.setState({
      minutes: minutes < 10? '0' + minutes: minutes,
      seconds: seconds < 10? '0' + seconds: seconds
    })
  }

  reset() {
    this.setState({
      minutes: '00',
      seconds: '00'
    })
  }

  componentDidMount() {
    this.timerInterval = setInterval(this.tick.bind(this), 1000)
    if (this.props.control) {
      document.controller.resetRestTimer = this.reset.bind(this)
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval)
    if (this.props.control) {
      delete document.controller.resetRestTimer
    }
  }
}

export default Timer