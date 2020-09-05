import React from 'react'

type propTypes = {
  value?: string
}

const InputDescription = (props: propTypes) => {
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