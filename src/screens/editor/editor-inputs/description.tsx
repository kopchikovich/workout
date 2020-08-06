import React from 'react'

type propsTypes = {
  value?: string
}

const InputDescription = (props: propsTypes) => {
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