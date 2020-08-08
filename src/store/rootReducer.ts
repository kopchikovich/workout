import { initialState } from './initialState'
import { actionType } from './actions'
import { SWITCH_SCREEN } from './types'

export const rootReducer = (state = initialState, action: actionType) => {
  console.log('dispatch action: ', action)
  switch (action.type) {
    case SWITCH_SCREEN:
      return {
        ...state,
        screen: action.payload
      }
    default:
      return state
  }
}