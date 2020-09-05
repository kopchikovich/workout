import React from 'react'

type propTypes = {
  value?: string
}

const InputName = (props: propTypes) => {
  return (
    <label className='editor-form__label'>
      <span className='editor-form__text'>
        Название
      </span>
      <input
        className='editor-form__text-input'
        type='text'
        id='name'
        defaultValue={props.value}
      />
    </label>
  )
}

export default InputName