import React, { useState } from 'react'

const InputExercises = (props) => {

    const [ state, setState ] = useState(props.value)
    const exercises_db = new document.controller.Local_db('exercises').open()

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
            <option value={id} key={id}>
                {el.name}
            </option>
        )
    })

    const changeHandler = (e) => {
        const value = e.target.value

        if (!state.includes(value)) {
            return setState([...state, value])
        }
        return setState(state.filter((el) => el !== value))
    }
    
    return (
        <ol className='editor-form__list'>

            <select
                className='editor-form__select'
                multiple={true}
                name='exercises[]'
                value={state}
                onChange={changeHandler}
            >
                {exerciseOptions}
            </select>

            {exerciseList}
            
        </ol>
    )
}

export default InputExercises