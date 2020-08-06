import React from 'react'

type propsTypes = {
  className?: string
  onChangeHandler?: () => {}
  isChecked?: boolean
}

const Checkbox = (props: propsTypes) => {
  return (
    <input
      type='checkbox'
      className={props.className}
      onChange={props.onChangeHandler}
      checked={props.isChecked}
    />
  )
}

export default Checkbox