import React from 'react'
import './timer.css'

type propsTypes = {
  minutes?: number | string
  seconds?: number | string
  control?: boolean
}

class Timer extends React.Component {
  state: propsTypes
  timerInterval: any

  constructor(props: propsTypes) {
    // @ts-ignore
    super()
    const initialState: propsTypes = {
      minutes: props.minutes? props.minutes : '00',
      seconds: props.seconds? props.seconds : '00'
    }
    this.state = initialState
  }

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
    // @ts-ignore
    let minutes = +this.state.minutes
    // @ts-ignore
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
    // @ts-ignore
    if (this.props.control) {
      localStorage.setItem('backup-rest-timer', JSON.stringify(this.state))
    } else {
      localStorage.setItem('backup-timer', JSON.stringify(this.state))
    }
  }

  reset() {
    this.setState({
      minutes: '00',
      seconds: '00'
    })
  }

  componentDidMount() {
    this.timerInterval = setInterval(this.tick.bind(this), 1000)
    // @ts-ignore
    if (this.props.control) {
      // @ts-ignore
      document.controller.resetRestTimer = this.reset.bind(this)
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval)
    // @ts-ignore
    if (this.props.control) {
      // @ts-ignore
      delete document.controller.resetRestTimer
    }
    // @ts-ignore
    if (this.props.control) {
      localStorage.removeItem('backup-rest-timer')
    } else {
      localStorage.removeItem('backup-timer')
    }
  }
}

export default Timer