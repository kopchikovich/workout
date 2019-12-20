import React from 'react'

const OptionTimeOneHand = () => {
    return (
        <label className='input__container'>
            <span className='input__text'>Время</span>
            <div className='input__container input__container--column'>
                <span className='input__text--small'>Левая</span>
                <input type='time' className='input__input input__input--time' id='time-left' />
                <span className='input__text--small'>Правая</span>
                <input type='time' className='input__input input__input--time' id='time-right' />
            </div>
        </label>
    )
}

export default OptionTimeOneHand