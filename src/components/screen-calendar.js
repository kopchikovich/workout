import React, {Component} from 'react'
import './screen-calendar.css'
import Month from './month'

class ScreenCalendar extends Component {

    state = {
        currentDate: new Date(),
        lastRenderedMonth: new Date().getMonth()
    }

    render() {
        return (
            <section className='calendar'>
                <Month state={this.state}/>
            </section>
        )
    }
}

export default ScreenCalendar