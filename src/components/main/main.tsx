import React from 'react'
import './main.css'
import { initialState } from '../../store/initialState'
import { connect } from 'react-redux'
import ScreenIndex from '../../screens/index/index'
import ScreenWorkout from '../../screens/workout/workout'
import ScreenCalendar from '../../screens/calendar/calendar'
import ScreenExercise from '../../screens/exercise/exercise'
import ScreenUser from '../../screens/user/user'
import ScreenEditor from '../../screens/editor/editor'
import Loader from '../../components/loader/loader'

type propTypes = {
  screen: string
}

const Main = ({ screen }: propTypes) => {
  const screens: any = {
    index: <ScreenIndex />,
    workout: <ScreenWorkout />,
    calendar: <ScreenCalendar />,
    exercise: <ScreenExercise />,
    user: <ScreenUser />,
    editor: <ScreenEditor />,
    login: <Loader />
  }

  return (
    <main className='main'>
      {screens[screen] || <h2>Error</h2>}
    </main>
  )
}

const mapStateToProps = (state: typeof initialState) => {
  return {
    screen: state.screen
  }
}

export default connect(mapStateToProps)(Main)