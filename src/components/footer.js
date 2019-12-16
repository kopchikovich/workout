import React from 'react'
import './footer.css'
import Button from './button'

const Footer = (props) => {

    const footerTitles = [['index', 'Начать'], ['calendar', 'Календарь'], ['exercise', 'Тренировки'], ['user', 'Аккаунт']];
    const isCurrent = (screen) => {
        return props.screen === screen;
    };

    const footerList = footerTitles.map((title, key) => {
        return (
            <li key={key}>
                <Button
                    className={isCurrent(title[0])? 'markers-list__button markers-list__button--current' : 'markers-list__button'}
                    value={title[0]}
                    title={title[1]}
                    onClickHandler={props.switchScreen}
                    disabled={isCurrent(title[0])}
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