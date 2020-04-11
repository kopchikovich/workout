import React from 'react'
import './header.css'

const Header = (props) => {

    const training_db = JSON.parse(localStorage.getItem('trainings'));
    const {screen, headerText, trainingKey} = props.state;
    let renderedText = '';
    
    if (headerText) {
        renderedText = headerText;
    } else {
        switch (screen) {
            case 'index':
                renderedText = 'Начать тренировку'; break;
            case 'workout':
                renderedText = training_db[trainingKey].name; break;
            case 'calendar':
                renderedText = 'Календарь'; break;
            case 'exercise':
                renderedText = 'Тренировки'; break;
            case 'user':
                renderedText = 'Аккаунт'; break;
            default:
                renderedText = 'Where is i'; break;
        }
    }
    

    return (
        <header className='header'>
            <h2 className="header__text">{renderedText}</h2>
        </header>
    )
}

export default Header