import React from 'react'
import './header.css'

const Header = (props) => {

    const {screen} = props;
    let text = '';

    switch (screen) {
        case 'index':
            text = 'Начать тренировку'; break;
        case 'calendar':
            text = 'Календарь'; break;
        case 'exercise':
            text = 'Описания тренировок'; break;
        case 'user':
            text = 'Аккаунт'; break;
        default:
            text = 'Where is i'; break;
    }

    return (
        <header className='header'>
            <h2 className="header__text">{text}</h2>
        </header>
    )
}

export default Header