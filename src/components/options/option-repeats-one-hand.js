import React from 'react'

const OptionRepeatsOneHand = () => {
    return (
        <div className='input__container'>
            <span className='input__text'>Повторы</span>
            <div className='input__container input__container--column'>
                <span className='input__text--small'>Левая</span>
                <input type='number' className='input__input input__input--repeats' name='repeats-left' placeholder='0' />
                <span className='input__text--small'>Правая</span>
                <input type='number' className='input__input input__input--repeats' name='repeats-right' placeholder='0' />
            </div>
        </div>
    )
}

export default OptionRepeatsOneHand