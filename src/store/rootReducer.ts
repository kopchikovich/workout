import { initialState } from './initialState'
import { actionType } from './actions'
import * as types from './types'

export const rootReducer = (state = initialState, action: actionType) => {
  console.log('dispatch action: ', action)
  console.log('prev state: ', state)
  switch (action.type) {
    case types.SWITCH_SCREEN:
      return {
        ...state,
        screen: action.payload
      }
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
      return {
        ...state,
        headerText: action.payload
      }
    }
    case types.SET_IS_LOGIN: {
      return {
        ...state,
        isLogin: action.payload
      }
    }
    case types.SET_DARK_THEME: {
      return {
        ...state,
        darkTheme: action.payload
      }
    }
    default:
      return state
  }
}