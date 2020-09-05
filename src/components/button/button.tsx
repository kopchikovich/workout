import React from 'react'
import './button.css'

type propTypes = {
  className?: string
  onClickHandler?: React.ReactEventHandler<HTMLButtonElement>
  value?: string
  disabled?: boolean
  title: string
  id?: string
}

const Button = (props: propTypes) => {
  return (
    <button
      className={props.className}
      onClick={props.onClickHandler}
      value={props.value}
      disabled={props.disabled}
      id={props.id}
    >
      {props.title}
    </button>
  )
}

export default Button