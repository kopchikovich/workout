import React, { useState } from 'react'
import './editor.css'
import EditorForm from '../editor-form'
import Button from '../button'

const ScreenEditor = () => {

    const Selection = () => {

        const selectHandler = (e) => {
            setCurrentView(<List target={e.target.value} />)
        }    

        return (
            <div className='editor-section__selection'>
                <span className='editor-section__row'>
                    Что редактируем?
                </span>
                <div className='editor-section__row'>
                    <Button
                        title='Тренировки'
                        className='button--editor'
                        value='trainings'
                        onClickHandler={selectHandler}
                    />
                    <Button
                        title='Упражнения'
                        className='button--editor'
                        value='exercises'
                        onClickHandler={selectHandler}
                    />
                </div>
            </div>
        )
    }

    const List = (props) => {
        const targetObj = JSON.parse(localStorage.getItem(props.target))
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
            setCurrentView(<EditorForm target={e.target.value} targetObj={targetObj} />)
        }

        return (
            <ul className='editor-section__list' onClick={clickHandler}>
                {list}
            </ul>
        )
    }

    const [ currentView, setCurrentView ] = useState(Selection)

    return (
        <section className='editor-section'>
            {currentView}
        </section>
    )
}

export default ScreenEditor