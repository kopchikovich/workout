import React from 'react'
import './header.css'
import { initialState } from '../../store/initialState'
import { connect } from 'react-redux'

type propTypes = {
  headerText: string
  screen: string
}

const Header = ({ headerText, screen }: propTypes) => {
  const headerNames = {
    index: 'Начать тренировку',
    calendar: 'Календарь',
    exercise: 'Тренировки',
    user: 'Аккаунт',
    editor: 'Редактор',
    login: ' '
  }
  let renderedText: string = ''

  if (headerText) {
    renderedText = headerText
  } else {
    // @ts-ignore
    renderedText = headerNames[screen] || 'Where i am'
  }

  return (
    <header className='header'>
      <h2 className="header__text">
        {renderedText}
      </h2>
    </header>
  )
}

const mapStateToProps = (state: typeof initialState) => {
  return {
    screen: state.screen,
    headerText: state.headerText
  }
}

export default connect(mapStateToProps)(Header)