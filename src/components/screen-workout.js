import React, {Component} from 'react'
import './screen-workout.css'
import training_db from '../data'
import Button from './button'
import Timer from './timer'
import Exercise from './exercise'
import Sets from './sets'

// Training это шаблон тренировки (тренировка в базе данных)
// Workout это практическая тренировка, действие. Запись которой и происходит

class ScreenWorkout extends Component {

    constructor(props) {
        super(props)

        this.training = training_db[this.props.state.trainingKey];
        this.workout = {
            name: this.training.name,
            type: this.training.type,
            timeStart: new Date(),
            timeStop: '',
            durationInMinutes: '',
            exercises: {}
        }

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
                    <Timer control={true} />
                </article>

                <article className='training-table__cell training-table__cell--timer timer'>
                    <Timer />
                </article>

                <article className='training-table__cell training-table__cell--exercise exercise'>
                    <Exercise
                        state={this.state}
                        training={this.training}
                        switchExercise={this.switchExercise.bind(this)}
                        recordSet={this.recordSet.bind(this)}
                    />
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

    recordSet(e) {
        e.preventDefault();
        const form = e.target;
        const FORM_LENGTH_WITHOUT_BUTTON = form.length-1;
        let set = {};
        for (let i = 0; i < FORM_LENGTH_WITHOUT_BUTTON; i++) {
            set[form[i].name] = form[i].value;
        }

        let recordingExs = this.workout.exercises[this.state.currentExs.name];
        if (!recordingExs) recordingExs = this.workout.exercises[this.state.currentExs.name] = [];
        recordingExs.push(set);

        document.controller.resetRestTimer();
    }
}

export default ScreenWorkout