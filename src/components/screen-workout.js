import React, {Component} from 'react'
import './screen-workout.css'
import training_db from '../data'
import Button from './button'
import Timer from './timer'
import Exercise from './exercise'
import Sets from './sets'

class ScreenWorkout extends Component {

    constructor(props) {
        super(props)

        this.training = training_db[this.props.state.trainingKey];

        this.initialState = {
            currentExs: this.training.exercises[0],
            currentExsIndex: 0
        }
        this.state = this.initialState;

    }

    render() {
        return (
            <section className='training-table'>

                <article className='training-table__cell training-table__cell--timer timer'>
                    <Timer />
                </article>

                <article className='training-table__cell training-table__cell--timer timer'>
                    <Timer />
                </article>

                <article className='training-table__cell training-table__cell--exercise exercise'>
                    <Exercise state={this.state} training={this.training} switchExercise={this.switchExercise.bind(this)} />
                </article>

                <article className='training-table__cell training-table__cell--sets sets'>
                    <Sets />
                </article>

                <Button 
                    className='description__button button--arrow'
                    title='<'
                    onClickHandler={this.props.switchScreen}
                    value='index'
                />

            </section>
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

export default ScreenWorkout