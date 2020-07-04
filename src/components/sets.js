import React from 'react'
import './sets.css'

const Sets = (props) => {
  const makeSetString = (set) => {
    const options = Object.keys(set)
    const GRAM_IN_KILOGRAM = 1000

    if (options.includes('time-left') && options.includes('time-right')) {
      return `лев - ${set['time-left']} / прав - ${set['time-right']}`
    } else if (options.includes('weight') && options.includes('repeats-left') && options.includes('repeats-right')) {
      return `${(set.weight/GRAM_IN_KILOGRAM).toFixed(1)}кг лев - ${set['repeats-left']} / прав - ${set['repeats-right']}`
    } else if (options.includes('repeats-left') && options.includes('repeats-right')) {
      return `лев - ${set['repeats-left']} / прав - ${set['repeats-right']}`
    } else if (options.includes('time')) {
      return `${set.time}`
    } else if (options.includes('weight') && options.includes('repeats')) {
      return `${(set.weight/GRAM_IN_KILOGRAM).toFixed(1)} кг - ${set.repeats}`
    } else if (options.includes('repeats')) {
      return `${set.repeats}`
    }
    return 'error'
  }

  const toggleDeleteButton = (e) => {
    if (props.deleteSet) {
      const parent = e.target.parentNode
      const deleteButtonNode = parent.querySelector('.sets__btn')

      if (deleteButtonNode) {
        parent.removeChild(deleteButtonNode)
      } else {
        const deleteButton = document.createElement('button')
        deleteButton.className = 'sets__btn'
        deleteButton.addEventListener('click', clickHandler)
        parent.appendChild(deleteButton)
      }
    }
  }

  const clickHandler = (e) => {
    const parent = e.target.parentNode

    parent.removeChild(e.target)
    props.deleteSet(parent.id)
  }

  const renderSet = (set, index) => {
    return (
      <li className='sets__set' key={index} id={index}>
        <span onClick={toggleDeleteButton}>{makeSetString(set)}</span>
      </li>
    )
  }
  const sets = props.exercise? props.exercise.map(renderSet) : <li className='sets__set'>-</li>

  return (
    <ol className='sets__list'>
      {sets}
    </ol>
  )
}

export default Sets