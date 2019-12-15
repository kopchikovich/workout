import React from 'react'
import './footer.css'
import Button from './button'

const Footer = (props) => {

    const footerTitles = [['index', 'Начать'], ['calendar', 'Календарь'], ['exercise', 'Тренировки'], ['login', 'Аккаунт']];
    const isCurrent = (screen, item) => {
        if (screen === item) return 'markers-list__button markers-list__button--current';
        return 'markers-list__button';
    };

    const footerList = footerTitles.map((title, key) => {
        return (
            <li key={key}>
                <Button
                    className={isCurrent(props.screen, title[0])}
                    value={title[0]}
                    title={title[1]}
                    onClickHandler={props.switchScreen}
                />
            </li>
        )
    });

    return (
        <footer className='footer'>
            <ul className='footer__markers-list markers-list'>
                {footerList}
            </ul>
        </footer>
    )
}

export default Footer