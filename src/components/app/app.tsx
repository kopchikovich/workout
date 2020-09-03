import React from 'react'
import { connect } from 'react-redux'
import './app.css'
import Header from '../../components/header/header'
import Main from '../../components/main/main'
import Footer from '../../components/footer/footer'
import ModalWindow from '../../components/modal-window/modal-window'
import ScreenLogin from '../../screens/login/login'
import { initialState } from '../../store/initialState'

type propTypes = {
  isLogin: boolean
}

const App = ({ isLogin }: propTypes) => {
  return (
    <div className='app'>

      {isLogin? null : <ScreenLogin />}

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