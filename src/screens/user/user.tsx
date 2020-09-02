import React, { useState, useEffect } from 'react'
import './user.css'
import cloudData from '../../data/CloudData'
import Button from '../../components/button/button'
import Checkbox from '../../components/checkbox/checkbox'
import { switchScreen, setIsLogin, setDarkTheme, renderMessage } from '../../store/actions'
import { connect } from 'react-redux'
import { initialState } from '../../store/initialState'

type propsTypes = {
  dispatch: any
  darkTheme: boolean
  workoutPromiseLink: any
}

const ScreenUser = ({ dispatch, darkTheme, workoutPromiseLink }: propsTypes) => {
  const [ mileage, setMileage ]: any = useState('0')
  const [ lastWorkout, setLastWorkout ]: any = useState(<i>Ещё впереди</i>)

  useEffect(() => {
    const userMileage: string | null = localStorage.getItem('user-mileage')
    const userLastWorkout: string | null = localStorage.getItem('user-last-workout')
    if (userMileage) setMileage(userMileage)
    if (userLastWorkout && userLastWorkout !== 'undefined') setLastWorkout(userLastWorkout)
  }, [])

  const updateUserData = (): void => {
    cloudData.getUserData().then(() => {
      setMileage(localStorage.getItem('user-mileage'))
      setLastWorkout(localStorage.getItem('user-last-workout'))
    })
    cloudData.getUserWorkoutTemplates()
    cloudData.getUserExercises()
    // @ts-ignore
    dispatch(renderMessage('Синхронизируем..', 'green'))
  }

  // BACKUP
  // @ts-ignore
  const backupWorkout: any = JSON.parse(localStorage.getItem('workout-backup'))
  const sendBackup = (e: any): void => {
    e.target.parentNode.style.display = 'none'
    cloudData.recordWorkout(backupWorkout)
  }
  const backupMessage: any = (
    <p className='user__text user__text--column user__text--warning'>
      <span>Найдена несохранённа тренировка: <i>{backupWorkout? backupWorkout.name : null}</i></span>
      <Button className='user__button user__button--send' title='Отправить' onClickHandler={sendBackup} />
    </p>
  )

  const logout = () => {
    cloudData.signOut()
    dispatch(setIsLogin(false))
    dispatch(switchScreen('login'))
  }

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
          <Checkbox
            className='user__checkbox'
            onChangeHandler={() => dispatch(setDarkTheme(!darkTheme))}
            isChecked={darkTheme}
          />
        </p>

        {
          /* если есть бэкап, написать об этом и отправить */
          !workoutPromiseLink && localStorage.getItem('workout-backup') ? backupMessage : null
        }

        <Button className='user__button' title='Синхронизировать с облаком' onClickHandler={updateUserData} />
        <Button className='user__button' title='Выйти' onClickHandler={logout} />
      </div>
    </section>
  )
}

const mapStateToProps = (state: typeof initialState) => {
  return {
    darkTheme: state.darkTheme,
    workoutPromiseLink: state.workoutPromiseLink
  }
}

export default connect(mapStateToProps)(ScreenUser)