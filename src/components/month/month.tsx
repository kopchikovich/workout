import React, { useState, useEffect } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import './month.css'
import cloudData from '../../data/CloudData'
import calendar from './calendar.functions'

type propTypes = {
  monthNum: number
  dispatch: Dispatch
}

// Component
const Month = ({ monthNum, dispatch }: propTypes) => {
  const days = calendar.getMonth(monthNum)
  const [ needUpdate, setNeedUpdate ] = useState(false)

  useEffect(() => {
    const date: Date = new Date()
    date.setDate(1)
    date.setMonth(monthNum)
    cloudData.getMonthWorkouts(date).then(() => {
      if (!needUpdate) setNeedUpdate(true)
      calendar.highlightCurrentDay()
    })
  }, [])
  
  return (
    <article className='calendar__month'>
      <h3 className='calendar__header'>
        {calendar.getMonthName(monthNum)}
      </h3>
      <div
        className='calendar__days'
        onClick={(e) => calendar.openWorkoutData(e, dispatch)}
      >
        {days}
      </div>
    </article>
  )
}

export default connect()(Month)