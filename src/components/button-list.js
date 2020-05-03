import React from 'react'
import './button-list.css'
import Button from './button'

const ButtonList = (props) => {

    const training_db = localStorage.getItem('trainings')? JSON.parse(localStorage.getItem('trainings')) : {}
    const compare = (a, b) => {
        if (a.type === 'power' && b.type !== 'power') {
            return -1
        } else if (a.type !== 'power' && b.type === 'power') {
            return 1
        } else {
            return 0
        }
    }
    const list = Object.values(training_db).sort(compare).map((training, key) => {
        return (
            <li className='buttons-list__item' key={key}>
                <Button
                    className='buttons-list__button'
                    title={training.name}
                    value={training.key}
                    onClickHandler={props.onClickHandler}
                />
            </li>
        )
    })
    

    return (
        <ul className={props.className}>
            {list}
        </ul>
    )
}

export default ButtonList