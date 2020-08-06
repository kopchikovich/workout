import React from 'react'
import Button from '../../components/button/button'
import List from './list'

type propsTypes = {
  setCurrentView: any
  switchScreen: any
}

const Selection = (props: propsTypes) => {
  const selectHandler = (e: any): void => {
    props.setCurrentView((
      <List
        target={e.target.value}
        switchScreen={props.switchScreen}
        setCurrentView={props.setCurrentView}
      />
    ))
  }

  return (
    <div className='editor-section__selection'>
      <span className='editor-section__row'>
        Что редактируем?
      </span>
      <div className='editor-section__row'>
        <Button
          title='Тренировки'
          className='button--editor'
          value='workout-templates'
          onClickHandler={selectHandler}
        />
        <Button
          title='Упражнения'
          className='button--editor'
          value='exercises'
          onClickHandler={selectHandler}
        />
      </div>
    </div>
  )
}

export default Selection