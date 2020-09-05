import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import './login.css'
import Button from '../../components/button/button'
import { login } from '../../store/actions'

type propTypes = {
  dispatch: Dispatch
}

const ScreenLogin = ({ dispatch }: propTypes) => {
  const submitHandler: React.ReactEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    // @ts-ignore
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