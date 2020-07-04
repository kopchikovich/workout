import React, { useState } from 'react'
import './input-number.css'
import Button from '@/components/button'

const InputNumber = (props) => {
  const [ state, setState ] = useState(0)
  const MIN_VALUE = 0
  const MAX_VALUE = 100

  const increment = (e) => {
    e.preventDefault()
    if (state >= MAX_VALUE) {
      setState(MAX_VALUE)
    } else if (state <= MIN_VALUE) {
      setState(MIN_VALUE+1)
    } else {
      setState(state+1)
    }
  }
  const decrement = (e) => {
    e.preventDefault()
    if (state <= MIN_VALUE) {
      setState(MIN_VALUE)
    } else if (state >= MAX_VALUE) {
      setState(MAX_VALUE-1)
    } else {
      setState(state-1)
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
        onChange={(e) => setState(+e.currentTarget.value)}
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