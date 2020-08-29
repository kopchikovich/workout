import React from 'react'
import './modal-window.css'
import { connect } from 'react-redux'
import { initialState } from '../../store/initialState'
import { closeModal } from '../../store/actions'


type propsTypes = {
  isVisible: boolean
  header: string
  content: string
  dispatch: any
}

const ModalWindow = ({ isVisible, header, content, dispatch }: propsTypes) => {
  const display = isVisible? 'flex' : 'none'
  const displayHeader = header? 'flex' : 'none'

  const closeHandler = (e: any) => {
    if (e.target === e.currentTarget) {
      dispatch(closeModal())
    }
  }

  return (
    <div
      className='modal__wrapper'
      style={{display: display}}
      onClick={(e: any) => closeHandler(e)}
    >
      <section className='modal'>
        <header className='modal__header' style={{display: displayHeader}}>
          {header}
        </header>
        <article className='modal__content'>
          {content}
        </article>
      </section>
    </div>
  )
}

const mapStateToProps = (state: typeof initialState) => {
  return {
    isVisible: state.modal.isVisible,
    header: state.modal.header,
    content: state.modal.content
  }
}

export default connect(mapStateToProps)(ModalWindow)