import React from 'react'

const OptionWeight = () => {
    return (
        <label className='input__container'>
            <span className='input__text'>Вес</span>
            <select className='input__input input__input--weight' name='weight'>
                <option value='0' className='input__weight-value'>без веса</option>
                <option value='7300' className='input__weight-value'>7,3 (2x2.5)</option>
                <option value='8300' className='input__weight-value'>8,3 (2x2.5,2x0.5)</option>
                <option value='9800' className='input__weight-value'>9,8 (2x2.5,2x1.25)</option>
                <option value='10800' className='input__weight-value'>10,8 (2x2.5,2x1.25,2x0.5)</option>
                <option value='12300' className='input__weight-value'>12,3 (4x2.5)</option>
                <option value='13300' className='input__weight-value'>13,3 (4x2.5,2x0.5)</option>
                <option value='14800' className='input__weight-value'>14,8 (4x2.5,2x1.25)</option>
                <option value='15800' className='input__weight-value'>15,8 (4x2.5,2x1.25,2x0.5)</option>
            </select>
        </label>
    )
}

export default OptionWeight