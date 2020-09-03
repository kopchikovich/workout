import React from 'react'
import './login.css'
import Button from '../../components/button/button'
import { login } from '../../store/actions'
import { connect } from 'react-redux'

type propTypes = {
  dispatch: any
}

const ScreenLogin = ({ dispatch }: propTypes) => {
  const submitHandler = (e: any): void => {
    e.preventDefault()
    dispatch(login(e.target.email.value, e.target.password.value))
  }

  return (
    <div className='login__wrapper'>
      <form className='login' onSubmit={submitHandler}>
        <label className='login__block'>
          <span className='login__text'>Почта</span>
          <input type='email' name='email' id='email' className='login__input' />
        </label>
        <label className='login__block'>
          <span className='login__text'>Пароль</span>
          <input type='password' name='password' id='password' className='login__input' />
        </label>
        <Button className='login__submit' title='Войти' />
      </form>
    </div>
  )
}

export default connect()(ScreenLogin)