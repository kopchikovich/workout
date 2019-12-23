import React from 'react'
import './sets.css'

const Sets = (props) => {

    const makeSetString = (set) => {
        const options = Object.keys(set);
        const GRAM_IN_KILOGRAM = 1000;

        if (options.includes('time-left') && options.includes('time-right')) {
            return `лев - ${set['time-left']} / прав - ${set['time-right']}`;
        } else if (options.includes('weight') && options.includes('repeats-left') && options.includes('repeats-right')) {
            return `лев ${(set.weight/GRAM_IN_KILOGRAM).toFixed(1)}кг - ${set['repeats-left']} / прав ${(set.weight/GRAM_IN_KILOGRAM).toFixed(1)}кг - ${set['repeats-right']}`;
        } else if (options.includes('repeats-left') && options.includes('repeats-right')) {
            return `лев - ${set['repeats-left']} / прав - ${set['repeats-right']}`;
        } else if (options.includes('time')) {
            return `${set.time}`;
        } else if (options.includes('weight') && options.includes('repeats')) {
            return `${(set.weight/GRAM_IN_KILOGRAM).toFixed(1)} кг - ${set.repeats}`;
        } else if (options.includes('repeats')) {
            return `${set.repeats}`;
        }
        return 'error';
    }

    const renderSets = (set, index) => {
        return (
            <li className='sets__set' key={index}>
                {makeSetString(set)}
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