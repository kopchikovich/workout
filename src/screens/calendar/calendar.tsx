import React from 'react'
import './calendar.css'
import cloudData from '../../data/CloudData'
import Button from '../../components/button/button'
import Month from '../../components/month/month'

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
    this.getLastMonthWorkouts(this.state.lastRenderedMonth-1)
  }

  getLastMonthWorkouts(month) {
    const date = new Date()
    date.setDate(1)
    date.setMonth(month)
    cloudData.getMonthWorkouts(date).then(() => {
      this.setState({})
    })
  }

  highlightCurrentDay() {
    const date = new Date()
    const dateString = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    const currentDay = document.getElementById(dateString)
    currentDay.classList.add('calendar__day--current')
  }

  componentDidMount() {
    this.highlightCurrentDay()
    this.getLastMonthWorkouts(this.state.lastRenderedMonth)
  }

  componentDidUpdate() {
    this.highlightCurrentDay()
  }
}

export default ScreenCalendar