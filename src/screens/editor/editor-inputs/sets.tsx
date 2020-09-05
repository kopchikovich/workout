import React from 'react'

type propTypes = {
  value?: string
}

const InputSets = (props: propTypes) => {
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