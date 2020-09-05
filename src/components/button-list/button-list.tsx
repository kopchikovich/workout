import React from 'react'
import './button-list.css'
import localData from '../../data/LocalData'
import Button from '../button/button'

type propTypes = {
  onClickHandler?: React.ReactEventHandler<HTMLUListElement>
  className?: string
}

const ButtonList = (props: propTypes) => {
  const workoutTemplateDb = localData('workout-templates').open()
  const compare = (a: {type: string}, b: {type: string}) => {
    if (a.type === 'power' && b.type !== 'power') {
      return -1
    } else if (a.type !== 'power' && b.type === 'power') {
      return 1
    } else {
      return 0
    }
  }
  const list = Object.values(workoutTemplateDb).sort(compare).map((workoutTemplate, key) => {
    return (
      <li className='buttons-list__item' key={key}>
        <Button
          className='buttons-list__button'
          title={workoutTemplate.name}
          value={workoutTemplate.key}
        />
      </li>
    )
  })

  return (
    <ul
      className={props.className}
      onClick={props.onClickHandler}
    >
      {list.length > 0? list : 'Тренировок пока нет'}
    </ul>
  )
}

export default ButtonList