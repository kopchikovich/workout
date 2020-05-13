import React, { useState, useEffect } from 'react'
import './user.css'
import { firebase_recordWorkout, firebase_getUserData, firebase_getUserWorkoutTemplates, firebase_getUserExercises } from '../firebase'
import Button from '../components/button'
import Checkbox from '../components/checkbox'

const ScreenUser = (props) => {

    const [ mileage, setMileage ] = useState(0)
    const [ lastWorkout, setLastWorkout ] = useState(<i>Ещё впереди</i>)

    useEffect(() => {
        const userMileage = localStorage.getItem('user-mileage')
        const userLastWorkout = localStorage.getItem('user-last-workout')
        if (userMileage) setMileage(userMileage)
        if (userLastWorkout && userLastWorkout !== 'undefined') setLastWorkout(userLastWorkout)
    }, [])

    const updateUserData = () => {
        firebase_getUserData().then(() => {
            setMileage(localStorage.getItem('user-mileage'))
            setLastWorkout(localStorage.getItem('user-last-workout'))
        })
        firebase_getUserWorkoutTemplates()
        firebase_getUserExercises()
        document.controller.renderMessage('Синхронизируем..', 'green')
    }

    // BACKUP
    const backupWorkout = JSON.parse(localStorage.getItem('workout-backup'))
    const sendBackup = (e) => {
        e.target.parentNode.style.display = 'none'
        firebase_recordWorkout(backupWorkout)
    }
    const backupMessage = (
        <p className='user__text user__text--column user__text--warning'>
            <span>Найдена несохранённа тренировка: <i>{backupWorkout? backupWorkout.name : null}</i></span>
            <Button className='user__button user__button--send' title='Отправить' onClickHandler={sendBackup} />
        </p>
    )

    return (
        <section>
            <div className='user'>
                <p className='user__text'>
                    Привет, <span className='user__name'>
                        {localStorage.getItem('user-name') || 'пользователь'}
                    </span>
                </p>
                <p className='user__text'>
                    Твой пробег: <span className='user__mileage'>
                        {mileage}
                    </span> км
                </p>
                <p className='user__text user__text--column'>
                    Последняя тренировка:
                    <span className='user__last-workout'>
                        {lastWorkout}
                    </span>
                </p>
                <p className='user__text'>
                    Тёмная тема
                    <Checkbox className='user__checkbox' onChangeHandler={props.switchTheme} isChecked={props.darkTheme} />
                </p>

                {/* если есть бэкап, написать об этом и отправить */}
                {!document.controller.workoutAppendPromise && localStorage.getItem('workout-backup') ? backupMessage : null}

                <Button className='user__button' title='Синхронизировать с облаком' onClickHandler={updateUserData} />
                <Button className='user__button' title='Выйти' onClickHandler={props.logout} />
            </div>
        </section>
    )
}

export default ScreenUser