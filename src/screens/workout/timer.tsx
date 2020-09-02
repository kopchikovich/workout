import React from 'react'
import './timer.css'
import { connect } from 'react-redux'
import { initialState } from '../../store/initialState'
import { defaultCipherList } from 'constants'
import { setResetTimerLink } from '../../store/actions'

type propTypes = {
  minutes?: number | string
  seconds?: number | string
  control?: any
  resetTimerLink: any
  dispatch: any
}

class Timer extends React.Component {
  state: any
  props: any
  timerInterval: any

  constructor(props: propTypes) {
    // @ts-ignore
    super()
    this.state = {
      minutes: props.minutes || '00',
      seconds: props.seconds || '00'
    }
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
    if (this.props.control) {
      this.props.dispatch(setResetTimerLink(this.reset.bind(this)))
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval)
    if (this.props.control) {
      this.props.dispatch(setResetTimerLink(null))
      localStorage.removeItem('backup-rest-timer')
    } else {
      localStorage.removeItem('backup-timer')
    }
  }
}

const mapStateToProps = (state: typeof initialState) => {
  return {
    resetTimerLink: state.resetTimerLink
  }
}

// @ts-ignore
export default connect(mapStateToProps)(Timer)