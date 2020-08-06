import React from 'react'
import Button from '../button/button'

type propsTypes = {
  recordCardioWorkout: any
  closeModal: any
  workoutTemplate: object
}

const ModalForm = (props: propsTypes) => {
  const submit = (e: any): void => {
    e.preventDefault()
    props.recordCardioWorkout(e, props.workoutTemplate)
    props.closeModal(e, true)
  }

  return (
    <form className='modal__form' onSubmit={submit}>
      <div className='modal__container'>
        <span className='modal__text'>Время (минут)</span>
        <input className='modal__input' name='duration' type='number' min='1' max='120' step='1' placeholder='0' />
      </div>
      <div className='modal__container'>
        <span className='modal__text'>Расстояние (м)</span>
        <input className='modal__input' name='distance' type='number' min='100' max='15000' step='100' placeholder='0' />
      </div>
      <Button className='modal__submit' title='Записать' />
    </form>
  )
}

export default ModalForm