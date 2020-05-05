import React from 'react'
import './editor-form.css'
import Button from './button'

const EditorForm = (props) => {

    const [ editableItemId, editableItem ] = Object.entries(props.targetObj).find((el) => el[1].name === props.target)

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('submit', editableItemId);
    }

    return (
        <form className='editor-form' onSubmit={submitHandler}>
            <label className='editor-form__label'>
                <span className='editor-form__text'>
                    Название
                </span>
                <input
                    className='editor-form__text-input'
                    type='text'
                    id='name'
                    value={editableItem.name}
                    onChange={(e) => console.log(e)}
                />
            </label>
            <label className='editor-form__label'>
                <span className='editor-form__text'>
                    Описание
                </span>
                <textarea
                    className='editor-form__textarea'
                    id='description'
                    value={editableItem.description}
                    onChange={(e) => console.log(e)}
                />
            </label>
            <Button
                className='editor-form__button'
                title='Сохранить'
            />
        </form>
    )
}

export default EditorForm