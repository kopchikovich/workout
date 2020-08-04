import React, { useState } from 'react'
import './exercise.css'
import localData from '../../data/LocalData'
import ButtonList from '../../components/button-list/button-list'
import Button from '../../components/button/button'

const ScreenExercise = (props) => {
  const [ state, setState ] = useState({description: ''})

  const makeDescription = (e) => {
    const workoutTemplate_db = localData('workout-templates').open()
    const exercise_db = localData('exercises').open()
    const workoutTemplate = workoutTemplate_db[e.target.value]
    const parseArrayOfP = (arr) => {
      return arr.map((text, i) => {
        return (
          <p key={i}>
            {text.slice(3, -4)}
          </p>
        )
      })
    }
    const clearDescription = () => {
      setState({
        description: ''
      })
      props.printHeader('Тренировки')
    }
    const exercises = workoutTemplate.exercises.map((exs, index) => {
      return (
        <details className='description__exercise' key={index}>
          <summary>{exercise_db[exs].name}</summary>
          <div className="description__text">
            {typeof exercise_db[exs].description === 'string'? exercise_db[exs].description : parseArrayOfP(exercise_db[exs].description)}
          </div>
        </details>
      )
    })
    const returnButton = (
      <Button
        className='description__button button--arrow'
        title='<'
        value={'exercise'}
        onClickHandler={clearDescription}
      />
    )
    props.printHeader(workoutTemplate.name)
    setState({
      description: (
        <article className='description'>
          {workoutTemplate.description}
          {exercises}
          {returnButton}
        </article>
      )
    })
  }

  const exerciseList = (
    <ButtonList
      className='buttons-list buttons-list--description'
      onClickHandler={makeDescription}
    />
  )
  const editorButton = (
    <Button
      className='button--editor'
      title='Редактировать'
      onClickHandler={props.switchScreen}
      value='editor'
    />
  )

  return (
    <section>
      {state.description? null : editorButton}
      {state.description? state.description : exerciseList}
    </section>
  )
}

export default ScreenExercise