import React from 'react'
import './header.css'
import localData from '../../data/LocalData'

type propsTypes = {
  state: {
    screen: string
    headerText: string
    workoutTemplateKey: string
  }
}

const Header = (props: propsTypes) => {
  const workoutTemplateDb: any = localData('workout-templates').open()
  const { screen, headerText, workoutTemplateKey } = props.state
  const headerNames: any = {
    index: 'Начать тренировку',
    calendar: 'Календарь',
    exercise: 'Тренировки',
    user: 'Аккаунт',
    editor: 'Редактор',
    login: '',
    workout: workoutTemplateKey? workoutTemplateDb[workoutTemplateKey].name : ''
  }
  let renderedText: string = ''

  if (headerText) {
    renderedText = headerText
  } else {
    renderedText = headerNames[screen] || 'Where i am'
  }

  return (
    <header className='header'>
      <h2 className="header__text">{renderedText}</h2>
    </header>
  )
}

export default Header