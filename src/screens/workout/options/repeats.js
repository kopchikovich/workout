import React from 'react'
import InputNumber from '../input-number'

const OptionRepeats = () => {
  return (
    <label className='input__container' htmlFor='repeats'>
      <span className='input__text'>Повторы</span>
      <InputNumber name='repeats' id='repeats' />
    </label>
  )
}

export default OptionRepeats