import React from 'react'
import Button from '../../button'
import List from './list'

const Selection = (props) => {

    const selectHandler = (e) => {
        props.setCurrentView((
            <List
                target={e.target.value}
                switchScreen={props.switchScreen}
                setCurrentView={props.setCurrentView}
            />
        ))
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
                    value='workout-templates'
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

export default Selection