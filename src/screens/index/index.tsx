import React from 'react'
import ButtonList from '../../components/button-list/button-list'

type propsTypes = {
  openWorkoutScreen: any
}

const ScreenIndex = (props: propsTypes) => {
  return (
    <ButtonList
      className='buttons-list'
      onClickHandler={props.openWorkoutScreen}
    />
  )
}

export default ScreenIndex