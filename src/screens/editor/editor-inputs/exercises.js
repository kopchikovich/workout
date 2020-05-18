import React, { useState } from 'react'
import Local_db from '../../../local-db'

const InputExercises = (props) => {

  const [ state, setState ] = useState(props.value)
  const exercises_db = new Local_db('exercises').open()

  const getIdByName = (name) => {
    const db = Object.entries(exercises_db)
    return db[db.findIndex((el) => name === el[1].name)][0]
  }

  const exerciseList = state.map((el) => {
    return (
      <li className='editor-form__list-element' key={el}>
        {exercises_db[el].name}
      </li>
    )
  })

  const exerciseOptions = Object.values(exercises_db).map((el) => {
    const id = getIdByName(el.name)
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

  const changeHandler = (e) => {
    const value = e.target.value? e.target.value : e.target.firstChild.value
    let newState = null

    if (!state.includes(value)) {
      newState = [...state, value]
    } else {
      newState = state.filter((el) => el !== value)
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