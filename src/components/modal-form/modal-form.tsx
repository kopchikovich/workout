import React from 'react'
import { connect } from 'react-redux'
import Button from '../button/button'
import { closeModal } from '../../store/actions'

type propTypes = {
  workoutTemplate: any
  dispatch: any
}

const ModalForm = ({ workoutTemplate, dispatch }: propTypes) => {
  const submit = (e: any): void => {
    e.preventDefault()
    // props.recordCardioWorkout(e, props.workoutTemplate)
    dispatch(closeModal())
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



export default connect()(ModalForm)