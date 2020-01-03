import React, {Component} from 'react'
import {firebase_recordWorkout} from '../../firebase'
import './screen-workout.css'
import training_db from '../../data'
import Button from '../button'
import Timer from '../timer'
import Exercise from '../exercise'
import Sets from '../sets'

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
            durationInMinutes: ''
        }

        this.initialState = {
            currentExs: this.training.exercises[0],
            currentExsIndex: 0,
            exercises: {}
        }
        this.state = this.initialState;

        document.controller.recordWorkout = this.recordWorkout.bind(this);

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
                        openModal={this.props.openModal}
                    />
                </article>

                <article className='training-table__cell training-table__cell--sets sets'>
                    <h3 className='sets__header'>Выполнено</h3>
                    <Sets exercise={this.state.exercises[this.state.currentExs.name]} />
                </article>

                <Button 
                    className='description__button button--arrow'
                    title='<'
                    onClickHandler={this.confirmExit.bind(this)}
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

        const currentExsLink = this.state.exercises[this.state.currentExs.name];
        let sets = null;
        if (currentExsLink) {
            sets = Array.from(currentExsLink);
            sets.push(set);
        } else {
            sets = [set];
        }
        this.setState({
            exercises: Object.assign(this.state.exercises, {[this.state.currentExs.name]: sets})
        })

        document.controller.resetRestTimer();
    }

    recordWorkout(e) {
        const MILLISECONDS_IN_MINUTE = 60000;
        const date = this.workout.timeStop = new Date();
        this.workout.durationInMinutes = Math.floor((this.workout.timeStop - this.workout.timeStart)/MILLISECONDS_IN_MINUTE);
        const workout = Object.assign(this.workout, {exercises: this.state.exercises});

        const dateString = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;

        if (!localStorage.getItem(dateString)) {
            localStorage.setItem(dateString, JSON.stringify([workout]));
        } else {
            let array = JSON.parse(localStorage.getItem(dateString));
            array.push(workout);
            localStorage.setItem(dateString, JSON.stringify(array));
        }

        document.controller.renderMessage('Тренировка записана', 'green');
        this.props.switchScreen(e);

        // make backup and append workout to firestore
        localStorage.setItem('workout-backup', JSON.stringify(workout));
        firebase_recordWorkout(workout);
    }

    confirmExit(e) {
        let content = (
            <>
                <p>Вернуться к списку тренировок без сохранения данных?</p>
                <div className='modal__buttons'>
                    <Button title='Да' onClickHandler={this.props.switchScreen}  value='index' />
                    <Button title='Нет' onClickHandler={this.props.closeModal} />
                </div>
            </>
        )
        this.props.openModal('Выход', content)
    }

    componentWillUnmount() {
        delete document.controller.recordWorkout;
    }
}

export default ScreenWorkout