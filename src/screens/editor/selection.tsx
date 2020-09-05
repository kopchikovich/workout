import React from 'react'
import Button from '../../components/button/button'
import List from './list'

type propTypes = {
  setCurrentView: any
}

const Selection = ({ setCurrentView }: propTypes) => {
  const selectHandler: React.ReactEventHandler<HTMLButtonElement> = (e) => {
    setCurrentView((
      <List
        // @ts-ignore
        target={e.target.value}
        setCurrentView={setCurrentView}
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