import React from 'react'
import './footer.css'
import Button from '../../components/button/button'

const Footer = (props) => {
  const footerTitles = [['index', 'Начать'], ['calendar', 'Календарь'], ['exercise', 'Тренировки'], ['user', 'Аккаунт']]
  const isCurrent = (screen) => {
    return props.screen === screen
  }

  let footerList = []
  if (props.screen === 'workout') {
    footerList = (
      <li>
        <Button
          className='footer-list__button'
          title='Закончить тренировку'
          value='index'
          onClickHandler={(e) => document.controller.recordWorkout(e, true)}
        />
      </li>
    )
  } else if (props.screen === 'login') {
    footerList = []
  } else {
    footerList = footerTitles.map((title, key) => {
      return (
        <li key={key}>
          <Button
            className={isCurrent(title[0])? 'footer-list__button footer-list__button--current' : 'footer-list__button'}
            value={title[0]}
            title={title[1]}
            onClickHandler={props.switchScreen}
            disabled={isCurrent(title[0])}
          />
        </li>
      )
    })
  }

  return (
    <footer className='footer'>
      <ul className='footer__footer-list footer-list'>
        {footerList}
      </ul>
    </footer>
  )
}

export default Footer