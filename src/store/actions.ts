import { SWITCH_SCREEN } from './types'

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