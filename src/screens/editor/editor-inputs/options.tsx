import React from 'react'

type propTypes = {
  value: any
}

const InputOptions = (props: propTypes) => {
  const names: any = {
    'weight': 'Вес',
    'repeats': 'Повторения',
    'one hand': 'Для каждой руки отдельно',
    'time': 'Время',
    'distance': 'Расстояние'
  }

  const list = Object.keys(names).map((el, i) => {
    return (
      <label className='editor-form__label editor-form__label--checkbox' key={i}>
        <input
          className='editor-form__checkbox'
          type='checkbox'
          name='options'
          value={el}
          defaultChecked={props.value.includes(el)}
        />
        <span className='editor-form__text editor-form__text--small'>
          {names[el]}
        </span>
      </label>
    )
  })

  return (
    <div className='editor-form__checkbox-area'>
      {list}
    </div>
  )
}

export default InputOptions