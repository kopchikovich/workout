import React from 'react'

const InputDescription = (props) => {
  return (
    <label className='editor-form__label'>
      <span className='editor-form__text'>
        Описание
      </span>
      <textarea
        className='editor-form__textarea'
        id='description'
        defaultValue={props.value}
      />
    </label>
  )
}

export default InputDescription