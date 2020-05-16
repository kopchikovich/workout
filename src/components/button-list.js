import React from 'react'
import './button-list.css'
import Local_db from '../local-db'
import Button from './button'

const ButtonList = (props) => {

    const workoutTemplate_db = new Local_db('workout-templates').open()
    const compare = (a, b) => {
        if (a.type === 'power' && b.type !== 'power') {
            return -1
        } else if (a.type !== 'power' && b.type === 'power') {
            return 1
        } else {
            return 0
        }
    }
    const list = Object.values(workoutTemplate_db).sort(compare).map((workoutTemplate, key) => {
        return (
            <li className='buttons-list__item' key={key}>
                <Button
                    className='buttons-list__button'
                    title={workoutTemplate.name}
                    value={workoutTemplate.key}
                    onClickHandler={props.onClickHandler}
                />
            </li>
        )
    })
    

    return (
        <ul className={props.className}>
            {list.length > 0? list : 'Тренировок пока нет'}
        </ul>
    )
}

export default ButtonList