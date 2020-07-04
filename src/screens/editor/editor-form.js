import React from 'react'
import './editor-form.css'
import cloudData from '@/data/CloudData'
import localData from '@/data/LocalData'
import Button from '@/components/button'
import InputName from './editor-inputs/name'
import InputDescription from './editor-inputs/description'
import InputSets from './editor-inputs/sets'
import InputType from './editor-inputs/type'
import InputOptions from './editor-inputs/options'
import InputExercises from './editor-inputs/exercises'

const EditorForm = (props) => {
  let [ editableItemId, editableItem ] = Object.entries(props.targetObj).find((el) => el[1].name === props.target)

  let exercises = editableItem.exercises
  const setExercises = (newExercises) => {
    exercises = newExercises
  }

  const submitHandler = (e) => {
    e.preventDefault()

    let db = null
    const inputs = e.target.elements

    if (editableItem.exercises) {
      editableItem = Object.assign(editableItem, {
        name: inputs.name.value,
        description: inputs.description.value,
        type: inputs.type.value,
        exercises
      })
      db = localData('workout-templates')
      db.edit(editableItem, editableItemId)
      cloudData.setUserWorkoutTemplates()
    } else if (editableItem.options) {
      const options = []
      inputs.options.forEach((el) => {
        if (el.checked) {
          options.push(el.value)
        }
      })
      editableItem = Object.assign(editableItem, {
        name: inputs.name.value,
        description: inputs.description.value,
        sets: inputs.sets.value,
        options
      })
      db = localData('exercises')
      db.edit(editableItem, editableItemId)
      cloudData.setUserExercises()
    }
    document.controller.renderMessage('Сохранено', 'green')
    props.switchScreen({target: {value: 'exercise'}})
  }

  const names = {
    options: 'Параметры упражнения',
    sets: 'Количество подходов (продолжительность)',
    type: 'Тип тренировки',
    exercises: 'Упражнения'
  }

  const components = {
    options: <InputOptions value={editableItem.options} />,
    sets: <InputSets value={editableItem.sets} />,
    type: <InputType value={editableItem.type} />,
    exercises: <InputExercises value={editableItem.exercises} setExercises={setExercises} />
  }

  const differentInputs = Object.keys(editableItem).map((el, i) => {
    if (!names[el]) return null
    return (
      <div className='editor-form__container' key={i}>
        <span className='editor-form__text'>
          {names[el]}
        </span>
        {components[el]}
      </div>
    )
  })

  return (
    <form className='editor-form' onSubmit={submitHandler}>

      <div className='editor-form__container'>
        <InputName value={editableItem.name} />
      </div>
      <div className='editor-form__container'>
        <InputDescription value={editableItem.description} />
      </div>

      {differentInputs}

      <Button
        className='editor-form__button'
        title='Сохранить'
      />

    </form>
  )
}

export default EditorForm