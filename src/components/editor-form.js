import React from 'react'
import './editor-form.css'
import Button from './button'
import InputName from './editor-inputs/name'
import InputDescription from './editor-inputs/description'
import InputSets from './editor-inputs/sets'
import InputType from './editor-inputs/type'
import InputOptions from './editor-inputs/options'
import InputExercises from './editor-inputs/exercises'

const EditorForm = (props) => {

    const [ editableItemId, editableItem ] = Object.entries(props.targetObj).find((el) => el[1].name === props.target)

    const submitHandler = (e) => {
        e.preventDefault()
        console.dir(e.target, editableItemId);
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
        exercises: <InputExercises value={editableItem.exercises} />
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