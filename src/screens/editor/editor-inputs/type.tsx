import React from 'react'

type propTypes = {
  value: any
}

const InputType = (props: propTypes) => {
  const names: any = {
    power: 'Силовая',
    running: 'Бег',
    swimming: 'Плавание'
  }

  const list: Array<any> = Object.keys(names).map((el, i) => {
    return (
      <label className='editor-form__label editor-form__label--radio' key={i}>
        <input
          className='editor-form__radio'
          type='radio'
          name='type'
          value={el}
          defaultChecked={props.value === el? true : false}
        />
        <span className='editor-form__text editor-form__text--small'>
          {names[el]}
        </span>
      </label>
    )
  })

  return (
    <div className='editor-form__radio-area'>
      {list}
    </div>
  )
}

export default InputType