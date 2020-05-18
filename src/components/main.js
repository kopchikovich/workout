import React from 'react'
import './main.css'
import ScreenIndex from '../screens/index'
import ScreenWorkout from '../screens/workout/workout'
import ScreenCalendar from '../screens/calendar'
import ScreenExercise from '../screens/exercise'
import ScreenUser from '../screens/user'
import ScreenEditor from '../screens/editor/editor'

const Main = (props) => {

  const index = (
    <ScreenIndex
      openWorkoutScreen={props.openWorkoutScreen}
    />
  )
  const workout = (
    <ScreenWorkout
      state={props.state}
      switchScreen={props.switchScreen}
      openModal={props.openModal}
      closeModal={props.closeModal}
    />
  )
  const calendar = (
    <ScreenCalendar 
      openModal={props.openModal}
    />
  )
  const exercise = (
    <ScreenExercise
      printHeader={props.printHeader}
      switchScreen={props.switchScreen}
    />
  )
  const user = (
    <ScreenUser
      switchTheme={props.switchTheme}
      darkTheme={props.state.darkTheme}
      logout={props.logout}
    />
  )
  const editor = (
    <ScreenEditor switchScreen={props.switchScreen} />
  )

  const {screen} = props.state;
  let renderedScreen = <h2>some error..</h2>;

  switch (screen) {
    case 'index':
      renderedScreen = index;
      break;
    case 'workout':
      renderedScreen = workout;
      break;
    case 'calendar':
      renderedScreen = calendar;
      break;
    case 'exercise':
      renderedScreen = exercise;
      break;
    case 'user':
      renderedScreen = user;
      break;
    case 'editor':
      renderedScreen = editor;
      break;
    default:
      renderedScreen = index;
      break;
  }

  return (
    <main className='main'>
      {renderedScreen}
    </main>
  )
}

export default Main