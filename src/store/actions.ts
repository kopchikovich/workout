import { Dispatch } from 'redux'
import cloudData from '../data/CloudData'
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

export const setDarkTheme = (darkTheme: boolean): actionType => {
  return {
    type: types.SET_DARK_THEME,
    payload: darkTheme
  }
}

export const setRecordWorkoutLink = (link: any | null): actionType => {
  return {
    type: types.SET_RECORD_WORKOUT_LINK,
    payload: link
  }
}

export const setWorkoutPromiseLink = (link: any | null): actionType => {
  return {
    type: types.SET_WORKOUT_PROMISE_LINK,
    payload: link
  }
}

export const setResetTimerLink = (link: any | null): actionType => {
  return {
    type: types.SET_RESET_TIMER_LINK,
    payload: link
  }
}

export const renderMessage = (text: string, color: string): actionType => {
  return {
    type: types.RENDER_MESSAGE,
    payload: { text, color }
  }
}

export const setIsLogin = (isLogin: boolean): actionType => {
  return {
    type: types.SET_IS_LOGIN,
    payload: isLogin
  }
}

export const logout = (): actionType => {
  return {
    type: types.LOGOUT
  }
}

export const checkLogin = (): actionType => {
  return {
    type: types.CHECK_LOGIN
  }
}

// async thunk
export const login: any = (email: string, password: string) => {
  return (dispatch: Dispatch) => {
    cloudData.signIn(email, password).then(() => {
      cloudData.getUserWorkoutTemplates().then(() => {
        dispatch(switchScreen('index'))
      }
      )
      cloudData.getUserData().then(() => {
        dispatch(setDarkTheme(localStorage.getItem('dark-theme') === 'true'))
      })
    })
  }
}