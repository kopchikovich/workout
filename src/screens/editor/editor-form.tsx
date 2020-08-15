import React from 'react'
import './editor-form.css'
import cloudData from '../../data/CloudData'
import localData from '../../data/LocalData'
import Button from '../../components/button/button'
import InputName from './editor-inputs/name'
import InputDescription from './editor-inputs/description'
import InputSets from './editor-inputs/sets'
import InputType from './editor-inputs/type'
import InputOptions from './editor-inputs/options'
import InputExercises from './editor-inputs/exercises'

type propsTypes = {
  targetObj: any
  target: string
  switchScreen: any
}

const EditorForm = (props: propsTypes) => {
  let [ editableItemId, editableItem ]: any = Object.entries(props.targetObj).find((el: Array<any>) => el[1].name === props.target)

  let exercises: any = editableItem.exercises
  const setExercises = (newExercises: any) => {
    exercises = newExercises
  }

  const submitHandler = (e: any) => {
    e.preventDefault()

    let db: any = null
    const inputs: any = e.target.elements

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
      const options: Array<any> = []
      inputs.options.forEach((el: any) => {
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
    // @ts-ignore
    document.controller.renderMessage('Сохранено', 'green')
    props.switchScreen({target: {value: 'exercise'}})
  }

  const names: any = {
    options: 'Параметры упражнения',
    sets: 'Количество подходов (продолжительность)',
    type: 'Тип тренировки',
    exercises: 'Упражнения'
  }

  const components: any = {
    options: <InputOptions value={editableItem.options} />,
    sets: <InputSets value={editableItem.sets} />,
    type: <InputType value={editableItem.type} />,
    exercises: <InputExercises value={editableItem.exercises} setExercises={setExercises} />
  }

  const differentInputs: any = Object.keys(editableItem).map((el, i) => {
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