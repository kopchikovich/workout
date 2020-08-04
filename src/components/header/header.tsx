import React from 'react'
import './header.css'
import localData from '../../data/LocalData'

const Header = (props) => {
  const workoutTemplateDb = localData('workout-templates').open()
  const { screen, headerText, workoutTemplateKey } = props.state
  const headerNames = {
    index: 'Начать тренировку',
    calendar: 'Календарь',
    exercise: 'Тренировки',
    user: 'Аккаунт',
    editor: 'Редактор',
    login: '',
    workout: workoutTemplateKey? workoutTemplateDb[workoutTemplateKey].name : ''
  }
  let renderedText = ''

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