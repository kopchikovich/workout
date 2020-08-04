import React from 'react'
import ButtonList from '../../components/button-list/button-list'

const ScreenIndex = (props) => {
  return (
    <ButtonList
      className='buttons-list'
      onClickHandler={props.openWorkoutScreen}
    />
  )
}

export default ScreenIndex