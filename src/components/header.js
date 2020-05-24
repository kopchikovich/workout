import React from 'react'
import './header.css'
import Local_db from '../local-db'

const Header = (props) => {

  const workoutTemplate_db = new Local_db('workout-templates').open()
  const { screen, headerText, workoutTemplateKey } = props.state  
  let renderedText = ''  
  
  if (headerText) {
    renderedText = headerText  
  } else {
    switch (screen) {
      case 'index':
        renderedText = 'Начать тренировку';
        break;
      case 'workout':
        renderedText = workoutTemplate_db[workoutTemplateKey].name;
        break;
      case 'calendar':
        renderedText = 'Календарь';
        break;
      case 'exercise':
        renderedText = 'Тренировки';
        break;
      case 'user':
        renderedText = 'Аккаунт';
        break;
      case 'editor':
        renderedText = 'Редактор';
        break;
      case 'login':
        renderedText = '';
        break;
      default:
        renderedText = 'Where is i';
        break;
    }
  }

  return (
    <header className='header'>
      <h2 className="header__text">{renderedText}</h2>
    </header>
  )
}

export default Header