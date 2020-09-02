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

  render(): any {
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

  setLastRenderedMonth(): void {
    this.setState({
      lastRenderedMonth: this.state.lastRenderedMonth-1
    })
    this.getLastMonthWorkouts(this.state.lastRenderedMonth-1)
  }

  getLastMonthWorkouts(month: number): void {
    const date: Date = new Date()
    date.setDate(1)
    date.setMonth(month)
    cloudData.getMonthWorkouts(date).then(() => {
      this.setState({})
    })
  }

  highlightCurrentDay(): void {
    const date: Date = new Date()
    const dateString: string = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    const currentDay: HTMLElement | null = document.getElementById(dateString)
    if (currentDay) {
      currentDay.classList.add('calendar__day--current')
    }
  }

  componentDidMount(): void {
    this.highlightCurrentDay()
    this.getLastMonthWorkouts(this.state.lastRenderedMonth)
  }

  componentDidUpdate(): void {
    this.highlightCurrentDay()
  }
}

export default ScreenCalendar