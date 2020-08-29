import { initialState } from './initialState'
import { actionType } from './actions'
import { SWITCH_SCREEN, OPEN_WORKOUT_SCREEN, OPEN_MODAL, CLOSE_MODAL, WRITE_HEADER } from './types'

export const rootReducer = (state = initialState, action: actionType) => {
  console.log('dispatch action: ', action)
  switch (action.type) {
    case SWITCH_SCREEN:
      return {
        ...state,
        screen: action.payload
      }
    case OPEN_WORKOUT_SCREEN: {
      return {
        ...state,
        screen: 'workout',
        workoutTemplateKey: action.payload
      }
    }
    case OPEN_MODAL: {
      return {
        ...state,
        modal: {
          isVisible: true,
          header: action.payload.header,
          content: action.payload.content
        }
      }
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        modal: {
          isVisible: false,
          header: '',
          content: ''
        }
      }
    }
    case WRITE_HEADER: {
      return {
        ...state,
        headerText: action.payload
      }
    }
    default:
      return state
  }
}