import React, {Component} from 'react'
import './timer.css'

class Timer extends Component {

    initialState = {
        minutes: this.props.minutes? this.props.minutes : '00',
        seconds: this.props.seconds? this.props.seconds : '00'
    }
    state = this.initialState

    tick() {
        let minutes = +this.state.minutes;
        let seconds = +this.state.seconds;
        seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            if (minutes === 60) minutes = 0;
        this.setState({
            minutes: minutes < 10? '0' + minutes: minutes,
            seconds: seconds < 10? '0' + seconds: seconds
        })
    }

    componentDidMount() {
        this.timerInterval = setInterval(this.tick.bind(this), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerInterval);
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
}

export default Timer