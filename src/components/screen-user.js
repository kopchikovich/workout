import React from 'react'
import Login from './login'
import User from './user'

const ScreenUser = (props) => {

    const loginView = <Login login={props.login} />
    const userView = <User logout={props.logout} />

    return (
        <section>
            {props.isLogin? userView : loginView}
        </section>
    )
}

export default ScreenUser