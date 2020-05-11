import React, {Component} from 'react'
import './exercise.css'
import Local_db from '../../local-db'
import ButtonList from '../button-list'
import Button from '../button'

class ScreenExercise extends Component {

    state = {
        description: ''
    }

    makeDescription(e) {

        const workoutTemplate_db = new Local_db('workout-templates').open();
        const exercise_db = new Local_db('exercises').open();
        const workoutTemplate = workoutTemplate_db[e.target.value];
        const parseArrayOfP = (arr) => {
            return arr.map((text, i) => {
                return (
                    <p key={i}>
                        {text.slice(3, -4)}
                    </p>
                )
            })
        }

        const exercises = workoutTemplate.exercises.map((exs, index) => {
            return (
                <details className='description__exercise' key={index}>
                    <summary>{exercise_db[exs].name}</summary>
                    <div className="description__text">
                        {typeof exercise_db[exs].description === 'string'? exercise_db[exs].description : parseArrayOfP(exercise_db[exs].description)}
                    </div>
                </details>
            )
        });
        const returnButton = (
            <Button
                className='description__button button--arrow'
                title='<'
                value={'exercise'}
                onClickHandler={this.clearDescription.bind(this)}
            />
        )
        this.props.printHeader(workoutTemplate.name);
        this.setState({
            description: (
            <article className='description'>
                {workoutTemplate.description}
                {exercises}
                {returnButton}
            </article>
            )
        })
    }

    clearDescription() {
        this.setState({
            description: ''
        });
        this.props.printHeader('Тренировки');
    }

    render() {
        const exerciseList = (
            <ButtonList
                className='buttons-list buttons-list--description'
                onClickHandler={this.makeDescription.bind(this)}
            />
        )
        const editorButton = (
            <Button
                className='button--editor'
                title='Редактировать'
                onClickHandler={this.props.switchScreen}
                value='editor'
            />
        )

        return (
            <section>
                {!!this.state.description? null : editorButton}
                {!!this.state.description? this.state.description : exerciseList}
            </section>
        )
    }

}

export default ScreenExercise