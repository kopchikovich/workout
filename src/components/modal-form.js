import React from 'react'
import Button from './button'

const ModalForm = (props) => {
    return (
        <form className='modal__form'>
            <div className='modal__container'>
                <span className='modal__text'>Время (минут)</span>
                <input className='modal__input' name='duration' type='number' min='1' max='120' step='1' defaultValue='0' />
            </div>
            <div className='modal__container'>
                <span className='modal__text'>Расстояние (м)</span>
                <input className='modal__input' name='distance' type='number' min='100' max='15000' step='100' defaultValue='0' />
            </div>
            <Button className='modal__submit' title='Записать' />
        </form>
    )
}

export default ModalForm