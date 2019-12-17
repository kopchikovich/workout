import React, {Component} from 'react'
import './screen-calendar.css'
import Button from './button'
import Month from './month'

class ScreenCalendar extends Component {

    state = {
        currentDate: new Date(),
        lastRenderedMonth: new Date().getMonth()
    }

    render() {
        return (
            <section className='calendar'>
                <Button className='calendar__button' title='^' onClickHandler={null} />
                <div className='calendar__container'>
                    <Month state={this.state} />
                </div>
            </section>
        )
    }

    setLastRenderedMonth() {
        this.setState({
            lastRenderedMonth: this.state.lastRenderedMonth-1
        })
    }
}

export default ScreenCalendar