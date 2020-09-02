import React from 'react'
import './footer.css'
import Button from '../../components/button/button'
import { switchScreen } from '../../store/actions'
import { initialState } from '../../store/initialState'
import { connect } from 'react-redux'

type propTypes = {
  screen: string
  recordWorkout: any
  dispatch: any
}

const Footer = ({ screen, recordWorkout, dispatch }: propTypes) => {
  const footerTitles: Array<Array<string>> = [
    ['index', 'Начать'],
    ['calendar', 'Календарь'],
    ['exercise', 'Тренировки'],
    ['user', 'Аккаунт']
  ]
  const isCurrent = (testedScreen: string) => {
    return screen === testedScreen
  }

  let footerList: any = []
  if (screen === 'workout') {
    footerList = (
      <li>
        <Button
          className='footer-list__button'
          title='Закончить тренировку'
          value='index'
          onClickHandler={(e: any) => recordWorkout(e, true)}
        />
      </li>
    )
  } else if (screen === 'login') {
    footerList = []
  } else {
    footerList = footerTitles.map((title: Array<string>, key: number) => {
      return (
        <li key={key}>
          <Button
            className={isCurrent(title[0])? 'footer-list__button footer-list__button--current' : 'footer-list__button'}
            value={title[0]}
            title={title[1]}
            onClickHandler={() => dispatch(switchScreen(title[0]))}
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

const mapStateToProps = (state: typeof initialState) => {
  return {
    screen: state.screen,
    recordWorkout: state.recordWorkoutLink
  }
}

export default connect(mapStateToProps)(Footer)