import React, { useState } from 'react'
import './input-number.css'
import Button from '../../components/button/button'

type propTypes = {
  name: string
  id?: string
}

const InputNumber = (props: propTypes) => {
  const [ state, setState ]: any = useState('0')
  const MIN_VALUE: number = 0
  const MAX_VALUE: number = 100

  const increment: React.ReactEventHandler<HTMLButtonElement> = (e) => {
    const value: number = +state
    e.preventDefault()
    if (value >= MAX_VALUE) {
      setState(MAX_VALUE)
    } else if (value <= MIN_VALUE) {
      setState(MIN_VALUE+1)
    } else {
      setState(value+1)
    }
  }
  const decrement: React.ReactEventHandler<HTMLButtonElement> = (e) => {
    const value: number = +state
    e.preventDefault()
    if (value <= MIN_VALUE) {
      setState(MIN_VALUE)
    } else if (value >= MAX_VALUE) {
      setState(MAX_VALUE-1)
    } else {
      setState(value-1)
    }
  }

  return (
    <div className='input-number__container'>
      <Button
        className='input-number__button input-number__button--reverse'
        onClickHandler={decrement}
        title='^'
      />
      <input
        type='number'
        className='input-number'
        name={props.name}
        id={props.id}
        value={state}
        onChange={(e) => setState(e.currentTarget.value)}
        min={MIN_VALUE}
        max={MAX_VALUE}
        step='1'
      />
      <Button
        className='input-number__button'
        onClickHandler={increment}
        title='^'
      />
    </div>
  )
}

export default InputNumber