import React, {Component} from 'react'
import './modal-window.css'

class ModalWindow extends Component {

    state = {
        isVisible: true
    }

    render() {

        let display = this.state.isVisible? 'flex' : 'none';

        return (
            <div className='modal__wrapper' style={{display: display}} onClick={this.close.bind(this)}>
                <div className='modal'>
                    <h3 className='modal__header'>
                        {this.props.header}
                    </h3>
                    <div className='modal__content'>
                        {this.props.content}
                    </div>
                </div>
            </div>
        )
    }

    close(e) {
        if (e.target === e.currentTarget) {
            this.setState({
                isVisible: false
            })
        }
    }
}

export default ModalWindow