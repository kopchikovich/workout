import React from 'react'
import './button.css'

type propsTypes = {
  className?: string
  onClickHandler?: any
  value?: string
  disabled?: boolean
  title?: string
}

const Button = (props: propsTypes) => {
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