import React, {Component} from 'react'
import './exercise.css'
import Button from './button'

class Exercise extends Component {

    constructor(props) {
        super(props)

        this.initialState = {
            currentExs: this.props.training.exercises[0],
            currentExsIndex: 0
        }
        this.state = this.initialState;

        this.training = this.props.training;
    }

    render() {
        return (
            <>
                <h3 className='exercise__header'>Упражнение</h3>
                <div className='exercise__checker checker input__container'>
                    <Button className='checker__btn' title='<' value='prev' onClickHandler={this.switchExercise.bind(this)} />
                    <span className='checker__current-exs'>
                        {this.state.currentExs.name}
                    </span>
                    <Button className='checker__btn' title='>' value='next' onClickHandler={this.switchExercise.bind(this)} />
                </div>
                <p className='exercise__sets'>
                    Подходы: <span>{this.state.currentExs.sets}</span>
                </p>
                <form className='exercise__input input' name='exercise-form'>
                    <Button className='input__btn-submit' title='Записать' onClickHandler={null} />
                </form>
            </>
        )
    }

    switchExercise(e) {
        let newExs = null;
        let newExsIndex = 0;

        if (e.target.value === 'prev') {
            newExsIndex = this.state.currentExsIndex-1 <= 0? 0 : this.state.currentExsIndex-1;
        } else if (e.target.value === 'next') {
            newExsIndex = this.state.currentExsIndex+1 >= this.training.exercises.length-1? this.training.exercises.length-1 : this.state.currentExsIndex+1;
        } else {
            return null;
        }
        newExs = this.training.exercises[newExsIndex];

        this.setState({
            currentExs: newExs,
            currentExsIndex: newExsIndex
        })
    }
}

export default Exercise