import React from 'react'
import './calendar.css'
import Button from '../../components/button/button'
import Month from '../../components/month/month'
import calendar from '../../components/month/calendar.functions'

class ScreenCalendar extends React.Component {
  state = {
    currentDate: new Date(),
    currentMonth: new Date().getMonth(),
    lastRenderedMonth: new Date().getMonth()
  }

  render() {
    const months = []
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

  componentDidMount() {
    calendar.highlightCurrentDay()
  }
}

export default ScreenCalendar