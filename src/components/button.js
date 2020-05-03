import React from 'react'
import './button.css'

const Button = (props) => {
    return (
        <button
            className={props.className}
            onClick={props.onClickHandler}
            value={props.value}
            disabled={props.disabled}
        >
            {props.title}
        </button>
    )
}

export default Button