import React from 'react'
import './modal-window.css'

type propsTypes = {
  isVisible: boolean
  header: string
  content: string
  closeModal: any
}

const ModalWindow = (props: propsTypes) => {
  const display = props.isVisible? 'flex' : 'none';
  const displayHeader = props.header? 'flex' : 'none';

  return (
    <div className='modal__wrapper' style={{display: display}} onClick={props.closeModal}>
      <section className='modal'>
        <header className='modal__header' style={{display: displayHeader}}>
          {props.header}
        </header>
        <article className='modal__content'>
          {props.content}
        </article>
      </section>
    </div>
  )
}

export default ModalWindow