import { dispatch, getState } from '../store'
import cloudData from '../../data/CloudData'
import { setIsLogin, switchScreen, openWorkoutScreen } from '../actions'

export default function() {
  const CHECK_NUMBER: number = 10
  const CHECK_INTERVAL: number = 1000
  let checkCounter: number = 0

  const loginCheckTimeout = setInterval(() => {
    checkCounter++
    if (checkCounter >= CHECK_NUMBER || getState().isLogin) {
      clearInterval(loginCheckTimeout)
      return null
    }
    if (cloudData.isLogin()) {
      clearInterval(loginCheckTimeout)
      dispatch(setIsLogin(cloudData.isLogin()))
      // check backup
      if (localStorage.getItem('backup-workout-template-key')) {
        // @ts-ignore
        dispatch(openWorkoutScreen(JSON.parse(localStorage.getItem('backup-workout-template-key'))))
      } else {
        dispatch(switchScreen('index'))
      }
    }
  }, CHECK_INTERVAL)
}