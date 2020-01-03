import React from 'react'
import './user.css'
import {firebase_recordWorkout} from '../firebase'
import Button from './button'
import Checkbox from './checkbox'

const User = (props) => {

    const backupWorkout = JSON.parse(localStorage.getItem('workout-backup'));
    const sendBackup = (e) => {
        e.target.parentNode.style.display = 'none';
        firebase_recordWorkout(backupWorkout);
    }
    const backupMessage = (
        <p className='user__text user__text--column user__text--warning'>
            <span>Найдена несохранённа тренировка: <i>{backupWorkout? backupWorkout.name : null}</i></span>
            <Button className='user__button user__button--send' title='Отправить' onClickHandler={sendBackup} />
        </p>
    )

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
            <p className='user__text user__text--column'>
                Последняя тренировка:
                <span className='user__last-workout'>
                    {localStorage.getItem('user-last-workout') && localStorage.getItem('user-last-workout') !== 'undefined' ? localStorage.getItem('user-last-workout') : <i>Будет записана после тренировки</i>}
                </span>
            </p>
            <p className='user__text'>
                Тёмная тема
                <Checkbox className='user__checkbox' onChangeHandler={props.switchTheme} isChecked={props.darkTheme} />
            </p>

            {/* если есть бэкап, написать об этом и отправить */}
            {!document.controller.workoutAppendPromise && localStorage.getItem('workout-backup') ? backupMessage : null}

            <Button className='user__button' title='Выйти' onClickHandler={props.logout} />
        </div>
    )
}

export default User