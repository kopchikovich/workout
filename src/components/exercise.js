import React from 'react'
import './exercise.css'
import Button from './button'
import OptionWeight from './options/option-weight'
import OptionRepeats from './options/option-repeats'
import OptionRepeatsOneHand from './options/option-repeats-one-hand'
import OptionTime from './options/option-time'
import OptionTimeOneHand from './options/option-time-one-hand'

const Exercise = (props) => {

    const exercise = props.state.currentExs;
    const options = exercise.options;

    let renderedOptions = [];

    if (options.includes('weight')) {
        renderedOptions.push(<OptionWeight key='weight' />);
    }
    if (options.includes('time') && options.includes('one hand')) {
        renderedOptions.push(<OptionTimeOneHand key='time-one-hand' />);
    } else if (options.includes('time')) {
        renderedOptions.push(<OptionTime key='time' />);
    }
    if (options.includes('repeats') && options.includes('one hand')) {
        renderedOptions.push(<OptionRepeatsOneHand key='repeats-one-hand' />);
    } else if (options.includes('repeats')) {
        renderedOptions.push(<OptionRepeats key='repeats' />);
    }

    return (
        <>
            <h3 className='exercise__header'>Упражнение</h3>
            <div className='exercise__checker checker'>
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
                {renderedOptions}
                <Button className='input__btn-submit' title='Записать' onClickHandler={null} />
            </form>
        </>
    )
}

export default Exercise