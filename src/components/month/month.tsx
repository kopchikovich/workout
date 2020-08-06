import React from 'react'
import './month.css'
import Sets from '../sets/sets'

// class with helping methods
class Calendar {
  getMonth(monthNum: number): Array<any> {
    const date: Date = new Date()
    date.setDate(1)
    date.setMonth(monthNum)
    const days: Array<any> = []
    let day: number = 1 - this._getFirstEmptyWeekDays(date)
    for (day; day <= this._getAmountOfDaysInMonth(date); day++) {
      const value: string | undefined = day > 0? `${date.getFullYear()}-${date.getMonth()+1}-${day}` : undefined
      let className: string = 'calendar__day'
      if (value && localStorage.getItem(value)) {
        // @ts-ignore
        const workouts = JSON.parse(localStorage.getItem(value))
        if (workouts.length > 1) {
          className += ' calendar__day-train calendar__day-train--power-and-run'
        } else if (workouts[0].type === 'power') {
          className += ' calendar__day-train calendar__day-train--power'
        } else if (workouts[0].type === 'running') {
          className += ' calendar__day-train calendar__day-train--run'
        } else if (workouts[0].type === 'swimming') {
          className += ' calendar__day-train calendar__day-train--swim'
        }
      }
      const newDay = (
        <span className={className} key={day} id={value}>
          {day > 0? day : null}
        </span>
      )
      days.push(newDay)
    }
    return days
  }

  getMonthName(monthNum: number): string {
    if (monthNum < 0) monthNum += 12
    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    return monthNames[monthNum]
  }

  getMonthNameInEng(monthNum: number): string {
    if (monthNum < 0) monthNum += 12
    const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
    return monthNames[monthNum]
  }

  _getAmountOfDaysInMonth(date: Date): number {
    return 33 - new Date(date.getFullYear(), date.getMonth(), 33).getDate()
  }

  _getFirstEmptyWeekDays(date: Date): number {
    const weekday: number = date.getDay()
    switch (weekday) {
      case 0: return 6 // Sunday
      case 1: return 0 // Monday
      case 2: return 1 // Tuesday
      case 3: return 2 // Wednesday
      case 4: return 3 // Thursday
      case 5: return 4 // Friday
      case 6: return 5 // Saturday
      default: return -1 // Error
    }
  }
}

type propsTypes = {
  monthNum: number
  openModal: any
}

// Component
const Month = (props: propsTypes) => {
  const days = Calendar.prototype.getMonth(props.monthNum)

  const openWorkoutData = (e: any) => {
    if (localStorage.getItem(e.target.id)) {
      const workouts: any = JSON.parse(localStorage[e.target.id])
      const dataToRender: Array<any> = []
      workouts.forEach((workout: any, index: number) => {
        if (workout.type !== 'power') {
          dataToRender.push((
            <article className='workout-data' key={index}>
              <h4 className='workout-data__header'>{workout.name}</h4>
              <p className='workout-data__text'>Расстояние: {workout.distance} м</p>
              <p className='workout-data__text'>Время тренировки: {workout.duration} мин</p>
            </article>
          ))
        } else if (workout.type === 'power') {
          const exercises: Array<any> = []
          Object.entries(workout.exercises).forEach((exercise, index) => {
            exercises.push((
              <div className='workout-data__exercise' key={index}>
                <span>{exercise[0]}</span>
                <Sets exercise={exercise[1]} />
              </div>
            ))
          })
          dataToRender.push((
            <article className='workout-data' key={index}>
              <h4 className='workout-data__header'>{workout.name}</h4>
              <p className='workout-data__text'>Время тренировки: {workout.durationInMinutes} мин</p>
              <details className='workout-data__exercises'>
                <summary>Упражнения</summary>
                {exercises}
              </details>
            </article>
          ))
        } else {
          dataToRender.push('Error reading workout from localStorage')
        }
      })

      props.openModal(false, dataToRender)
    }
  }

  return (
    <article className='calendar__month'>
      <h3 className='calendar__header'>
        {Calendar.prototype.getMonthName(props.monthNum)}
      </h3>
      <div className='calendar__days' onClick={openWorkoutData}>
        {days}
      </div>
    </article>
  )
}

export { Calendar }
export default Month