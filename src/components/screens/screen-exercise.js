import React, {Component} from 'react'
import './screen-exercise.css'
import ButtonList from '../button-list'
import Button from '../button'

class ScreenExercise extends Component {

    state = {
        description: ''
    }

    makeDescription(e) {

        const training_db = JSON.parse(localStorage.getItem('trainings'));
        const exercise_db = JSON.parse(localStorage.getItem('exercises'));
        const training = training_db[e.target.value];
        const parseArrayOfP = (arr) => {
            return arr.map((text, i) => {
                return (
                    <p key={i}>
                        {text.slice(3, -4)}
                    </p>
                )
            })
        }

        const exercises = training.exercises.map((exs, index) => {
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
        );
        this.props.printHeader(training.name);
        this.setState({
            description: (
            <article className='description'>
                {training.description}
                {exercises}
                {returnButton}
            </article>
            )
        });
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

        return (
            <section>
                {!!this.state.description? this.state.description : exerciseList}
            </section>
        )
    }

}

export default ScreenExercise