import React from 'react'
import User from '../user'

const ScreenUser = (props) => {

    return (
        <section>
            <User logout={props.logout} />
        </section>
    )
}

export default ScreenUser