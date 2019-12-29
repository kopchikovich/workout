import React from 'react'
import './login.css'
import Button from './button'

const Login = (props) => {
    return (
        <div className='login__wrapper'>
            <form className='login' onSubmit={props.login}>
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

export default Login