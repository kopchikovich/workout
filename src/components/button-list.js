import React from 'react'
import './button-list.css'
import Button from './button'

const ButtonList = (props) => {

    const training_db = JSON.parse(localStorage.getItem('trainings'));
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