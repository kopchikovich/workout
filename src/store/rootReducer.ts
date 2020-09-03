import { initialState } from './initialState'
import { actionType } from './actions'
import * as types from './types'
import renderMessage from './side-effects/renderMessage'
import loginEffects from './side-effects/loginEffects'
import cloudData from '../data/CloudData'

export const rootReducer = (state = initialState, action: actionType) => {
  console.log('dispatch action: ', action)
  switch (action.type) {
    case types.SWITCH_SCREEN:
      return { ...state, screen: action.payload }
    case types.OPEN_WORKOUT_SCREEN: {
      return {
        ...state,
        screen: 'workout',
        workoutTemplateKey: action.payload
      }
    }
    case types.OPEN_MODAL: {
      return {
        ...state,
        modal: {
          isVisible: true,
          header: action.payload.header,
          content: action.payload.content
        }
      }
    }
    case types.CLOSE_MODAL: {
      return {
        ...state,
        modal: {
          isVisible: false,
          header: '',
          content: ''
        }
      }
    }
    case types.WRITE_HEADER: {
      return { ...state, headerText: action.payload }
    }
    case types.SET_DARK_THEME: {
      return { ...state, darkTheme: action.payload }
    }
    case types.SET_RECORD_WORKOUT_LINK: {
      return { ...state, recordWorkoutLink: action.payload }
    }
    case types.SET_RESET_TIMER_LINK: {
      return { ...state, resetTimerLink: action.payload }
    }
    case types.RENDER_MESSAGE: {
      renderMessage(action.payload.text, action.payload.color)
      return state
    }
    case types.SET_IS_LOGIN: {
      return { ...state, isLogin: action.payload }
    }
    case types.LOGIN: {
      cloudData.signIn(action.payload.email, action.payload.password).then(() => {
        loginEffects()
      })
      return state
    }
    case types.LOGOUT: {
      cloudData.signOut()
      return {
        ...state,
        isLogin: false,
        screen: 'login'
      }
    }
    default:
      return state
  }
}