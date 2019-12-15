import React from 'react'
import './main.css'

const Main = (props) => {

    const {screen} = props.state;
    let renderedScreen = <h2>some error...</h2>;

    switch (screen) {
        case 'index':
            renderedScreen = '';
            break;
        case 'calendar':
            renderedScreen = '';
            break;
        case 'exercise':
            renderedScreen = '';
            break;
        case 'user':
            renderedScreen = '';
            break;
        default:
            renderedScreen = '';
            break;
    }

    return (
        <main className='main'>
            {renderedScreen}
        </main>
    )
}

export default Main