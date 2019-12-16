import React from 'react'
import './header.css'

const Header = (props) => {

    const {screen, text} = props;
    let renderedText = '';
    
    if (text) {
        renderedText = text;
    } else {
        switch (screen) {
            case 'index':
                renderedText = 'Начать тренировку'; break;
            case 'calendar':
                renderedText = 'Календарь'; break;
            case 'exercise':
                renderedText = 'Описания тренировок'; break;
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