import React from 'react'

const OptionTimeOneHand = () => {
    return (
        <div className='input__container'>
            <span className='input__text'>Время</span>
            <div className='input__container input__container--column'>
                <span className='input__text--small'>Левая</span>
                <input type='time' className='input__input input__input--time' name='time-left' defaultValue='00:00' />
                <span className='input__text--small'>Правая</span>
                <input type='time' className='input__input input__input--time' name='time-right' defaultValue='00:00' />
            </div>
        </div>
    )
}

export default OptionTimeOneHand