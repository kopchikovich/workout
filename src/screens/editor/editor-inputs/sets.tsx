import React from 'react'

type propsTypes = {
  value?: string
}

const InputSets = (props: propsTypes) => {
  return (
    <input
      className='editor-form__text-input'
      type='text'
      id='sets'
      defaultValue={props.value}
    />
  )
}

export default InputSets