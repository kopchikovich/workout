import React from 'react'
import './modal-window.css'

const ModalWindow = (props) => {

        let display = props.isVisible? 'flex' : 'none';
        let displayHeader = props.header? 'flex' : 'none';

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