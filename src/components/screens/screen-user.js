import React from 'react'
import User from '../user'

const ScreenUser = (props) => {

    return (
        <section>
            <User
                switchTheme={props.switchTheme}
                darkTheme={props.darkTheme}
                logout={props.logout}
            />
        </section>
    )
}

export default ScreenUser