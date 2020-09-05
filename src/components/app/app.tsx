import React from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import './app.css'
import Header from '../../components/header/header'
import Main from '../../components/main/main'
import Footer from '../../components/footer/footer'
import ModalWindow from '../../components/modal-window/modal-window'
import ScreenLogin from '../../screens/login/login'
import { initialState } from '../../store/initialState'
import { switchScreen, checkLogin, setDarkTheme } from '../../store/actions'

type propTypes = {
  isLogin: boolean
  darkTheme: boolean
  dispatch: Dispatch
}

const App = ({ isLogin, darkTheme, dispatch }: propTypes) => {
  useEffect(() => {
    if (!isLogin) dispatch(switchScreen('login'))
    dispatch(checkLogin())

    if (localStorage.getItem('dark-theme') === 'true') {
      dispatch(setDarkTheme(true))
    } else {
      dispatch(setDarkTheme(darkTheme))
    }
  }, [])

  return (
    <div className='app'>

      {!isLogin && <ScreenLogin />}

      <Header />
      <Main />
      <Footer />

      <ModalWindow />

    </div>
  )
}

const mapStateToProps = (state: typeof initialState) => {
  return {
    isLogin: state.isLogin,
    darkTheme: state.darkTheme
  }
}

export default connect(mapStateToProps)(App)