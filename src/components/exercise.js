import React from 'react'
import './exercise.css'
import Button from './button'

const Exercise = (props) => {

    const exercise = props.state.currentExs;

    return (
        <>
            <h3 className='exercise__header'>Упражнение</h3>
            <div className='exercise__checker checker input__container'>
                <Button className='checker__btn' title='<' value='prev' onClickHandler={props.switchExercise} />
                <span className='checker__current-exs'>
                    {exercise.name}
                </span>
                <Button className='checker__btn' title='>' value='next' onClickHandler={props.switchExercise} />
            </div>
            <p className='exercise__sets'>
                Подходы: <span>{exercise.sets}</span>
            </p>
            <form className='exercise__input input' name='exercise-form'>
                <Button className='input__btn-submit' title='Записать' onClickHandler={null} />
            </form>
        </>
    )
}

export default Exercise