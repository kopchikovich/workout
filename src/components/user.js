import React from 'react'
import './user.css'
import Button from './button'
import Checkbox from './checkbox'

const User = (props) => {
    return (
        <div className='user'>
            <p className='user__text'>
                Привет, <span className='user__name'>
                    {localStorage.getItem('user-name')}
                </span>
            </p>
            <p className='user__text'>
                Твой пробег: <span className='user__mileage'>
                    {localStorage.getItem('user-mileage')}
                </span> км
            </p>
            <p className='user__text'>
                Последняя тренировка: <br />
                <span className='user__last-workout'>
                    {localStorage.getItem('user-last-workout')}
                </span>
            </p>
            <p className='user__text'>
                Тёмная тема
                <Checkbox className='user__checkbox' onChangeHandler={props.switchTheme} isChecked={props.darkTheme} />
            </p>
            <Button className='user__button' title='Выйти' onClickHandler={props.logout} />
        </div>
    )
}

export default User