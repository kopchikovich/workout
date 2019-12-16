import React from 'react'
import ButtonList from './button-list'
import training_db from '../data'

const ScreenExercise = (props) => {

    const openDescription = (e) => {
        props.printHeader(training_db[e.target.value].name);
    }

    return (
        <ButtonList
            listClassName='buttons-list buttons-list--description'
            buttonClassName='buttons-list__button'
            liClassName='li--with-circle'
            onClickHandler={openDescription.bind(this)}
        />
    )
}

export default ScreenExercise