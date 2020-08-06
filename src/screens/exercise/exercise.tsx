import React, { useState } from 'react'
import './exercise.css'
import localData from '../../data/LocalData'
import ButtonList from '../../components/button-list/button-list'
import Button from '../../components/button/button'

type propsTypes = {
  writeHeader: any
  switchScreen: any
}

const ScreenExercise = (props: propsTypes) => {
  const inititalState: {description: any} = {description: null}
  const [ state, setState ] = useState(inititalState)

  const makeDescription = (e: any): void => {
    const workoutTemplate_db: any = localData('workout-templates').open()
    const exercise_db: any = localData('exercises').open()
    const workoutTemplate: any = workoutTemplate_db[e.target.value]
    const parseArrayOfP = (arr: Array<string>) => {
      return arr.map((text, i) => {
        return (
          <p key={i}>
            {text.slice(3, -4)}
          </p>
        )
      })
    }
    const clearDescription = (): void => {
      setState({
        description: ''
      })
      props.writeHeader('Тренировки')
    }
    const exercises: Array<any> = workoutTemplate.exercises.map((exs: any, index: number) => {
      return (
        <details className='description__exercise' key={index}>
          <summary>{exercise_db[exs].name}</summary>
          <div className="description__text">
            {typeof exercise_db[exs].description === 'string'? exercise_db[exs].description : parseArrayOfP(exercise_db[exs].description)}
          </div>
        </details>
      )
    })
    const returnButton: any = (
      <Button
        className='description__button button--arrow'
        title='<'
        value={'exercise'}
        onClickHandler={clearDescription}
      />
    )
    props.writeHeader(workoutTemplate.name)
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

  const exerciseList: any = (
    <ButtonList
      className='buttons-list buttons-list--description'
      onClickHandler={makeDescription}
    />
  )
  const editorButton: any = (
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