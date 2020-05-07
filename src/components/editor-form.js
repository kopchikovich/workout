import React from 'react'
import './editor-form.css'
import Button from './button'
import InputName from './editor-inputs/name'
import InputDescription from './editor-inputs/description'
import InputSets from './editor-inputs/sets'

const EditorForm = (props) => {

    const [ editableItemId, editableItem ] = Object.entries(props.targetObj).find((el) => el[1].name === props.target)

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('submit', editableItemId);
    }

    const names = {
        options: 'Параметры упражнения',
        sets: 'Количество подходов',
        type: 'Тип тренировки',
        exercises: 'Упражнения'
    }
    const components = {
        options: null,
        sets: <InputSets value={editableItem.sets} />,
        type: null,
        exercises: null
    }
    const differentInputs = Object.keys(editableItem).map((el, i) => {
        if (!names[el]) return null
        return (
            <label className='editor-form__label' key={i}>
                <span className='editor-form__text'>
                    {names[el]}
                </span>
                {components[el]}
            </label>
        )
    })

    return (
        <form className='editor-form' onSubmit={submitHandler}>

            <InputName value={editableItem.name} />
            <InputDescription value={editableItem.description} />

            {differentInputs}

            <Button
                className='editor-form__button'
                title='Сохранить'
            />

        </form>
    )
}

export default EditorForm