import React from 'react'

const OptionRepeatsOneHand = () => {
    return (
        <label className='input__container'>
            <span className='input__text'>Повторы</span>
            <div className='input__container input__container--column'>
                <span className='input__text--small'>Левая</span>
                <input type='number' className='input__input input__input--repeats' id='repeats-left' />
                <span className='input__text--small'>Правая</span>
                <input type='number' className='input__input input__input--repeats' id='repeats-right' />
            </div>
        </label>
    )
}

export default OptionRepeatsOneHand