import React, {Component} from 'react'
import './exercise.css'

class Sets extends Component {

    state = {}

    render() {
        return (
            <>
                <h3 className='sets__header'>Выполнено</h3>
                <ol className='sets__list'>
                    <li className='sets__set'>-</li>
                </ol>
            </>
        )
    }
}

export default Sets