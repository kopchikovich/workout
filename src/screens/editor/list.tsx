import React from 'react'
import localData from '../../data/LocalData'
import Button from '../../components/button/button'
import EditorForm from './editor-form'

type propTypes = {
  target: string
  setCurrentView: any
}

const List = ({ target, setCurrentView }: propTypes) => {
  const targetObj: any = localData(target).open()

  const list: Array<any> = Object.values(targetObj).map((elem: any, i: number) => {
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

  const clickHandler: React.ReactEventHandler<HTMLUListElement> = (e) => {
    setCurrentView(
      <EditorForm
        // @ts-ignore
        target={e.target.value}
        targetObj={targetObj}
      />)
  }

  return (
    <ul className='editor-section__list' onClick={clickHandler}>
      {list.length > 0? list : 'Не найдено записей в базе'}
    </ul>
  )
}

export default List