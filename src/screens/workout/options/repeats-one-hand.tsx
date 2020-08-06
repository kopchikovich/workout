import React from 'react'
import InputNumber from '../input-number'

const OptionRepeatsOneHand = () => {
  return (
    <div className='input__container'>
      <span className='input__text'>Повторы</span>
      <div className='input__container input__container--column'>
        <span className='input__text--small'>Левая</span>
        <InputNumber name='repeats-left' />
        <span className='input__text--small'>Правая</span>
        <InputNumber name='repeats-right' />
      </div>
    </div>
  )
}

export default OptionRepeatsOneHand