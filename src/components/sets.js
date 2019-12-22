import React from 'react'
import './exercise.css'

const Sets = (props) => {

    const renderSets = (set, index) => {
        return (
            <li className='sets__set' key={index}>
                {set.toString()}
            </li>
        )
    }

    const sets = props.exercise? props.exercise.map(renderSets) : <li className='sets__set'>-</li>;

    return (
        <>
            <h3 className='sets__header'>Выполнено</h3>
            <ol className='sets__list'>
                {sets}
            </ol>
        </>
    )

}

export default Sets