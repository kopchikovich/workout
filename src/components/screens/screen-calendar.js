import React, {Component} from 'react'
import './screen-calendar.css'
import Button from '../button'
import Month from '../month'

class ScreenCalendar extends Component {

    state = {
        currentDate: new Date(),
        currentMonth: new Date().getMonth(),
        lastRenderedMonth: new Date().getMonth()
    }

    render() {

        let months = []
        for (let i = this.state.lastRenderedMonth; i <= this.state.currentMonth; i++ ) {
            months.push((
                <Month monthNum={i} key={i} />
            ))
        }

        return (
            <section className='calendar'>
                <Button className='calendar__button' title='^' onClickHandler={this.setLastRenderedMonth.bind(this)} />
                <div className='calendar__container'>
                    {months}
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