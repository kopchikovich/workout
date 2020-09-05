import React, { useState } from 'react'
import localData from '../../../data/LocalData'

type propTypes = {
  value: any
  setExercises: any
}

const InputExercises = (props: propTypes) => {
  const [ state, setState ] = useState(props.value)
  const exercises_db: any = localData('exercises').open()

  const getIdByName = (name: string) => {
    const db: any = Object.entries(exercises_db)
    return db[db.findIndex((el: any) => name === el[1].name)][0]
  }

  const exerciseList = state.map((el: any) => {
    return (
      <li className='editor-form__list-element' key={el}>
        {exercises_db[el].name}
      </li>
    )
  })

  const exerciseOptions = Object.values(exercises_db).map((el: any) => {
    const id: string = getIdByName(el.name)
    return (
      <label className='editor-form__option' key={id}>
        <input
          className='editor-form__checkbox'
          type='checkbox'
          name='exercises'
          value={id}
          defaultChecked={state.includes(id)}
        />
        {el.name}
      </label>
    )
  })

  const changeHandler: React.ReactEventHandler<HTMLDivElement> = (e) => {
    // @ts-ignore
    const value: string = e.target.value? e.target.value : e.target.firstChild.value
    let newState: any = null

    if (!state.includes(value)) {
      newState = [...state, value]
    } else {
      newState = state.filter((el: any) => el !== value)
    }

    props.setExercises(newState)
    setState(newState)
  }

  return (
    <>
      <div className='editor-form__select' onChange={changeHandler}>
        {exerciseOptions}
      </div>
      <ol className='editor-form__list' id='exercises'>
        {exerciseList}
      </ol>
    </>
  )
}

export default InputExercises