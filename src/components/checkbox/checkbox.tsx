import React from 'react'

type propTypes = {
  className?: string
  onChangeHandler?: () => {}
  isChecked?: boolean
}

const Checkbox = (props: propTypes) => {
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