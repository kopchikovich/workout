import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import './exercise.css'
import Button from '../../components/button/button'
import OptionWeight from './options/weight'
import OptionRepeats from './options/repeats'
import OptionRepeatsOneHand from './options/repeats-one-hand'
import OptionTime from './options/time'
import OptionTimeOneHand from './options/time-one-hand'
import { openModal } from '../../store/actions'

type propTypes = {
  state: any
  workoutTemplate: any
  switchExercise: any
  recordSet: any
  dispatch: Dispatch
}

const Exercise = (props: propTypes) => {
  const exercise = props.state.currentExs
  const options = exercise.options

  const renderedOptions = []

  if (options.includes('weight')) {
    renderedOptions.push(<OptionWeight key='weight' />)
  }
  if (options.includes('time') && options.includes('one hand')) {
    renderedOptions.push(<OptionTimeOneHand key='time-one-hand' />)
  } else if (options.includes('time')) {
    renderedOptions.push(<OptionTime key='time' />)
  }
  if (options.includes('repeats') && options.includes('one hand')) {
    renderedOptions.push(<OptionRepeatsOneHand key='repeats-one-hand' />)
  } else if (options.includes('repeats')) {
    renderedOptions.push(<OptionRepeats key='repeats' />)
  }

  const openExerciseDescription = () => {
    props.dispatch(openModal(exercise.name, exercise.description))
  }

  return (
    <>
      <h3 className='exercise__header'>Упражнение</h3>
      <div>
        {props.state.currentExsIndex+1} / {props.workoutTemplate.exercises.length}
      </div>
      <div className='exercise__checker checker'>
        <Button className='checker__btn' title='<' value='prev' onClickHandler={props.switchExercise} />
        <span className='checker__current-exs'>
          <span onClick={openExerciseDescription}>{exercise.name}</span>
        </span>
        <Button className='checker__btn' title='>' value='next' onClickHandler={props.switchExercise} />
      </div>
      <p className='exercise__sets'>
        Подходы: <span>{exercise.sets}</span>
      </p>
      <form className='exercise__input input' name='exercise-form' onSubmit={props.recordSet}>
        {renderedOptions}
        <Button className='input__btn-submit' title='Записать' />
      </form>
    </>
  )
}

export default connect()(Exercise)