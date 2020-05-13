import React from 'react'

const InputOptions = (props) => {

    const names = {
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
                    defaultChecked={props.value.includes(el)? true : false}
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