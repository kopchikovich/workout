import React from 'react'
import './main.css'
import ScreenIndex from './screen-index'
import ScreenExercise from './screen-exercise'

const Main = (props) => {

    const index = <ScreenIndex />
    const calendar = null;
    const exercise = <ScreenExercise printHeader={props.printHeader}/>;
    const user = null;

    const {screen} = props.state;
    let renderedScreen = <h2>some error...</h2>;

    switch (screen) {
        case 'index':
            renderedScreen = index;
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