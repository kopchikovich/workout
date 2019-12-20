import React from 'react'

const OptionTime = () => {
    return (
        <label className='input__container'>
            <span className='input__text'>Время</span>
            <input type='time' className='input__input input__input--time' id='time' />
        </label>
    )
}

export default OptionTime