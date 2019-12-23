import React from 'react'
import './main.css'
import ScreenIndex from './screens/screen-index'
import ScreenWorkout from './screens/screen-workout'
import ScreenCalendar from './screens/screen-calendar'
import ScreenExercise from './screens/screen-exercise'
import ScreenUser from './screens/screen-user'

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
        />
    )
    const calendar = (
        <ScreenCalendar />
    )
    const exercise = (
        <ScreenExercise
            printHeader={props.printHeader}
        />
    )
    const user = (
        <ScreenUser
            isLogin={props.state.isLogin}
            login={props.login}
            logout={props.logout}
        />
    )

    const {screen} = props.state;
    let renderedScreen = <h2>some error...</h2>;

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