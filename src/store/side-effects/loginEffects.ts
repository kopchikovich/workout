import { dispatch } from '../store'
import cloudData from '../../data/CloudData'
import { setIsLogin, switchScreen, setDarkTheme } from '../actions'

export default function loginEffects(): void {
  dispatch(setIsLogin(true))
  cloudData.getUserWorkoutTemplates().then(
    dispatch(switchScreen('index'))
  )
  cloudData.getUserData().then(() => {
    dispatch(setDarkTheme(localStorage.getItem('dark-theme') === 'true'? true : false))
  })
}