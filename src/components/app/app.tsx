import React from 'react'
import './app.css'
import Header from '../../components/header/header'
import Main from '../../components/main/main'
import Footer from '../../components/footer/footer'
import ModalWindow from '../../components/modal-window/modal-window'

const App = () => {
  return (
    <div className='app'>

      <Header />
      <Main />
      <Footer />

      <ModalWindow />
    </div>
  )
}

export default App