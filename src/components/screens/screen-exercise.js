import React, {Component} from 'react'
import './screen-exercise.css'
import ButtonList from '../button-list'
import Button from '../button'
import training_db from '../../data'

class ScreenExercise extends Component {

    state = {
        description: ''
    }

    makeDescription(e) {
        const training = training_db[e.target.value];
        const exercises = training.exercises.map((exs, index) => {
            return (
                <details className='description__exercise' key={index}>
                    <summary>{exs.name}</summary>
                    <span className="description__text">{exs.description}</span>
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
                listClassName='buttons-list buttons-list--description'
                buttonClassName='buttons-list__button'
                liClassName='li--with-circle'
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