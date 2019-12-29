import React from 'react'

const Checkbox = (props) => {
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