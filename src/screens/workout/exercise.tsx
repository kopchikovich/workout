import React from 'react'
import './exercise.css'
import Button from '../../components/button/button'
import OptionWeight from './options/weight'
import OptionRepeats from './options/repeats'
import OptionRepeatsOneHand from './options/repeats-one-hand'
import OptionTime from './options/time'
import OptionTimeOneHand from './options/time-one-hand'

type propsTypes = {
  state: any
  workoutTemplate: any
  openModal: any
  switchExercise: any
  recordSet: any
}

const Exercise = (props: propsTypes) => {
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
    props.openModal(exercise.name, exercise.description)
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

export default Exercise