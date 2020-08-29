import React from 'react'
import { connect } from 'react-redux'
import { openWorkoutScreen, openModal, writeHeader } from '../../store/actions'
import ButtonList from '../../components/button-list/button-list'
import localData from '../../data/LocalData'
import ModalForm from '../../components/modal-form/modal-form'

type propTypes = {
  dispatch: any
}

const ScreenIndex = ({ dispatch }: propTypes) => {
  const clickHandler = (e: any) => {
    const workoutName: string = e.target.value
    if (!workoutName) {
      return null
    }
    // @ts-ignore
    const workoutTemplate: any = localData('workout-templates').open()[workoutName]
    if (workoutTemplate.type === 'power') {
      dispatch(openWorkoutScreen(workoutName))
      dispatch(writeHeader(workoutTemplate.name))
    } else if (workoutTemplate.type === 'running' || workoutTemplate.type === 'swimming') {
      dispatch(openModal(workoutTemplate.name, <ModalForm workoutTemplate={workoutTemplate} />))
    }
  }

  return (
    <ButtonList
      className='buttons-list'
      onClickHandler={(e: any) => clickHandler(e)}
    />
  )
}

export default connect()(ScreenIndex)