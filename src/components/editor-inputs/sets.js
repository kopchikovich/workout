import React from 'react'

const InputSets = (props) => {
    return (
        <input
            className='editor-form__text-input'
            type='text'
            id='name'
            defaultValue={props.value}
        />
    )
}

export default InputSets