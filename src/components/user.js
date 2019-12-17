import React from 'react'
import './user.css'
import Button from './button'

const User = (props) => {
    return (
        <div className='user'>
            <p className='user__text'>
                Привет, 
                <span className='user__name'></span>
            </p>
            <p className='user__text'>
                Твой пробег: <span className='user__mileage'></span> км
            </p>
            <p className='user__text'>
                Последняя тренировка: <br />
                <span className='user__last-workout'></span>
            </p>
            <Button className='user__button' title='Выйти' onClickHandler={props.logout} />
        </div>
    )
}

export default User