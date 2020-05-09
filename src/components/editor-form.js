import React from 'react'
import './editor-form.css'
import Button from './button'
import InputName from './editor-inputs/name'
import InputDescription from './editor-inputs/description'
import InputSets from './editor-inputs/sets'
import InputType from './editor-inputs/type'

const EditorForm = (props) => {

    const [ editableItemId, editableItem ] = Object.entries(props.targetObj).find((el) => el[1].name === props.target)

    const submitHandler = (e) => {
        e.preventDefault()
        console.dir(e.target, editableItemId);
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
        type: <InputType value={editableItem.type} />,
        exercises: null
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