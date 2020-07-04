import React from 'react'
import localData from '@/data/LocalData'
import Button from '@/components/button'
import EditorForm from './editor-form'

const List = (props) => {
  const targetObj = localData(props.target).open()

  const list = Object.values(targetObj).map((elem, i) => {
    return (
      <li className='editor-section__item' key={i}>
        <Button
          className='editor-section__button'
          title={elem.name}
          value={elem.name}
        />
      </li>
    )
  })

  const clickHandler = (e) => {
    props.setCurrentView(<EditorForm target={e.target.value} targetObj={targetObj} switchScreen={props.switchScreen} />)
  }

  return (
    <ul className='editor-section__list' onClick={clickHandler}>
      {list.length > 0? list : 'Не найдено записей в базе'}
    </ul>
  )
}

export default List