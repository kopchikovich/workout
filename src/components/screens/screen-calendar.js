import React, {Component} from 'react'
import {firebase_getMonthWorkouts} from '../../firebase'
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
                <Month monthNum={i} key={i} openModal={this.props.openModal} />
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
        this.getLastMonthWorkouts(this.state.lastRenderedMonth-1);
    }

    getLastMonthWorkouts(month) {
        let date = new Date();
        date.setDate(1);
        date.setMonth(month);
        firebase_getMonthWorkouts(date).then(() => {
            this.setState({});
        });
    }

    highlightCurrentDay() {
        const date = new Date();
        const dateString = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
        const currentDay = document.getElementById(dateString);
        currentDay.classList.add('calendar__day--current');
    }

    componentDidMount() {
        this.highlightCurrentDay();
        // get current month workouts
        this.getLastMonthWorkouts(this.state.lastRenderedMonth);
    }

    componentDidUpdate() {
        this.highlightCurrentDay();
    }
}

export default ScreenCalendar