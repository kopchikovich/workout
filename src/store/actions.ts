import { SWITCH_SCREEN, OPEN_WORKOUT_SCREEN, OPEN_MODAL, CLOSE_MODAL, WRITE_HEADER } from './types'

export type actionType = {
  type: string
  payload?: any
}

export const switchScreen = (screen: string): actionType => {
  return {
    type: SWITCH_SCREEN,
    payload: screen
  }
}

export const openWorkoutScreen = (workoutName: string): actionType => {
  return {
    type: OPEN_WORKOUT_SCREEN,
    payload: workoutName
  }
}

export const openModal = (header: string, content: any): actionType => {
  return {
    type: OPEN_MODAL,
    payload: { header, content }
  }
}

export const closeModal = (): actionType => {
  return {
    type: CLOSE_MODAL
  }
}

export const writeHeader = (headerText: string): actionType => {
  return {
    type: WRITE_HEADER,
    payload: headerText
  }
}