import React from 'react'
import './main.css'
import ScreenIndex from '../../screens/index/index'
import ScreenWorkout from '../../screens/workout/workout'
import ScreenCalendar from '../../screens/calendar/calendar'
import ScreenExercise from '../../screens/exercise/exercise'
import ScreenUser from '../../screens/user/user'
import ScreenEditor from '../../screens/editor/editor'
import Loader from '../../components/loader/loader'

const Main = (props) => {
  const workoutBackup = !!localStorage.getItem('backup-workout-template-key')
  const { screen } = props.state
  const screens = {
    index: (
      <ScreenIndex openWorkoutScreen={props.openWorkoutScreen} />
    ),
    workout: (
      <ScreenWorkout
        state={props.state}
        switchScreen={props.switchScreen}
        openModal={props.openModal}
        closeModal={props.closeModal}
        backup={workoutBackup}
      />
    ),
    calendar: (
      <ScreenCalendar
        openModal={props.openModal}
      />
    ),
    exercise: (
      <ScreenExercise
        writeHeader={props.writeHeader}
        switchScreen={props.switchScreen}
      />
    ),
    user: (
      <ScreenUser
        switchTheme={props.switchTheme}
        darkTheme={props.state.darkTheme}
        logout={props.logout}
      />
    ),
    editor: (
      <ScreenEditor switchScreen={props.switchScreen} />
    ),
    login: (
      <Loader />
    )
  }

  return (
    <main className='main'>
      {screens[screen] || <h2>Error</h2>}
    </main>
  )
}

export default Main