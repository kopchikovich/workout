import * as types from './types'

export type actionType = {
  type: string
  payload?: any
}

export const switchScreen = (screen: string): actionType => {
  return {
    type: types.SWITCH_SCREEN,
    payload: screen
  }
}

export const openWorkoutScreen = (workoutName: string): actionType => {
  return {
    type: types.OPEN_WORKOUT_SCREEN,
    payload: workoutName
  }
}

export const openModal = (header: string, content: any): actionType => {
  return {
    type: types.OPEN_MODAL,
    payload: { header, content }
  }
}

export const closeModal = (): actionType => {
  return {
    type: types.CLOSE_MODAL
  }
}

export const writeHeader = (headerText: string): actionType => {
  return {
    type: types.WRITE_HEADER,
    payload: headerText
  }
}

export const setIsLogin = (isLogin: boolean): actionType => {
  return {
    type: types.SET_IS_LOGIN,
    payload: isLogin
  }
}

export const setDarkTheme = (darkTheme: boolean): actionType => {
  return {
    type: types.SET_DARK_THEME,
    payload: darkTheme
  }
}