import React, { useState } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import './exercise.css'
import localData from '../../data/LocalData'
import ButtonList from '../../components/button-list/button-list'
import Button from '../../components/button/button'
import { writeHeader, switchScreen } from '../../store/actions'

type propTypes = {
  dispatch: Dispatch
}

const ScreenExercise = ({ dispatch }: propTypes) => {
  const [ description, setDescription ] = useState<any>(null)

  const makeDescription: React.ReactEventHandler<HTMLUListElement> = (e) => {
    // @ts-ignore
    const workoutTemplate: any = localData('workout-templates').open()[e.target.value]
    const exerciseDb: any = localData('exercises').open()
    const parseArrayOfP = (arr: Array<string>) => {
      return arr.map((text, i) => {
        return (
          <p key={i}>
            {text.slice(3, -4)}
          </p>
        )
      })
    }
    const clearDescription = () => {
      setDescription(null)
      dispatch(writeHeader('Тренировки'))
    }
    const exercises: Array<any> = workoutTemplate.exercises.map((exs: any, index: number) => {
      return (
        <details className='description__exercise' key={index}>
          <summary>{exerciseDb[exs].name}</summary>
          <div className="description__text">
            {typeof exerciseDb[exs].description === 'string'? exerciseDb[exs].description : parseArrayOfP(exerciseDb[exs].description)}
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
    dispatch(writeHeader(workoutTemplate.name))
    setDescription(
        <article className='description'>
          {workoutTemplate.description}
          {exercises}
          {returnButton}
        </article>
    )
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
      onClickHandler={(e: any) => dispatch(switchScreen(e.target.value))}
      value='editor'
    />
  )

  return (
    <section>
      {description? null : editorButton}
      {description? description : exerciseList}
    </section>
  )
}

export default connect()(ScreenExercise)