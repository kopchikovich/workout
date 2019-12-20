import React from 'react'

const OptionRepeats = () => {
    return (
        <label className='input__container'>
            <span className='input__text'>Повторы</span>
            <input type='number' className='input__input input__input--repeats' id='repeats' />
        </label>
    )
}

export default OptionRepeats