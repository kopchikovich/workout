import React from 'react'
import './button-list.css'
import training_db from '../data'
import Button from './button'

const ButtonList = (props) => {

    const list = Object.values(training_db).map((training, key) => {
        return (
            <li className={props.liClassName} key={key}>
                <Button
                    className={props.buttonClassName}
                    title={training.name}
                    value={training.key}
                    onClickHandler={props.onClickHandler}
                />
            </li>
        )
    });

    return (
        <ul className={props.listClassName}>
            {list}
        </ul>
    )
}

export default ButtonList