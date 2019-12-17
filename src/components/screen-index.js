import React from 'react'
import ButtonList from './button-list'

const ScreenIndex = (props) => {

    return (
        <ButtonList
            listClassName='buttons-list'
            buttonClassName='buttons-list__button'
            onClickHandler={props.openWorkoutScreen}
        />
    )
    
}

export default ScreenIndex