import React from 'react'
import { connect } from 'react-redux'
import cloudData from '../../data/CloudData'
import Button from '../button/button'
import { closeModal } from '../../store/actions'

type propTypes = {
  workoutTemplate: any
  dispatch: any
}

const ModalForm = ({ workoutTemplate, dispatch }: propTypes) => {
  const submit = (e: any): void => {
    e.preventDefault()
    const workout = {
      name: workoutTemplate.name,
      type: workoutTemplate.type,
      timeStop: new Date(),
      duration: e.target[0].value,
      distance: e.target[1].value
    }
    const dateString: string = `${workout.timeStop.getFullYear()}-${workout.timeStop.getMonth()+1}-${workout.timeStop.getDate()}`
    if (!localStorage.getItem(dateString)) {
      localStorage.setItem(dateString, JSON.stringify([workout]))
    } else {
      // @ts-ignore
      const array = JSON.parse(localStorage.getItem(dateString))
      array.push(workout)
      localStorage.setItem(dateString, JSON.stringify(array))
    }
    // make backup and append workout to firestore
    localStorage.setItem('workout-backup', JSON.stringify(workout))
    cloudData.recordWorkout(workout)
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