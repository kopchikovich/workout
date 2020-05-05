import React from 'react'
import './editor-form.css'

const EditorForm = (props) => {

    const [ editableItemId, editableItem ] = Object.entries(props.targetObj).find((el) => el[1].name === props.target)

    return (
        <form className='editor-form'>
            <h2>{editableItem.name}</h2>
            <p>{editableItem.description}</p>
        </form>
    )
}

export default EditorForm