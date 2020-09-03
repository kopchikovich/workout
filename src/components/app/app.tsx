import React from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import './app.css'
import Header from '../../components/header/header'
import Main from '../../components/main/main'
import Footer from '../../components/footer/footer'
import ModalWindow from '../../components/modal-window/modal-window'
import ScreenLogin from '../../screens/login/login'
import { initialState } from '../../store/initialState'
import { switchScreen, checkLogin } from '../../store/actions'

type propTypes = {
  isLogin: boolean
  dispatch: any
}

const App = ({ isLogin, dispatch }: propTypes) => {
  useEffect(() => {
    if (!isLogin) dispatch(switchScreen('login'))
    dispatch(checkLogin())
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
    isLogin: state.isLogin
  }
}

export default connect(mapStateToProps)(App)