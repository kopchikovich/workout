import React from 'react'

const OptionTime = () => {
  return (
    <label className='input__container'>
      <span className='input__text'>Время</span>
      <input type='time' className='input__input input__input--time' name='time' defaultValue='00:00' />
    </label>
  )
}

export default OptionTime