import React, {Component} from 'react'
import './screen-workout.css'
import training_db from '../data'
import Timer from './timer'
import Exercise from './exercise'
import Sets from './sets'

class ScreenWorkout extends Component {

    state = {

    }

    render() {

        const training = training_db[this.props.state.trainingKey];

        return (
            <section className='training-table'>

                <article className='training-table__cell training-table__cell--timer timer'>
                    <Timer />
                </article>

                <article className='training-table__cell training-table__cell--timer timer'>
                    <Timer />
                </article>

                <article className='training-table__cell training-table__cell--exercise exercise'>
                    <Exercise training={training} />
                </article>

                <article className='training-table__cell training-table__cell--sets sets'>
                    <Sets />
                </article>

            </section>
        )
    }
}

export default ScreenWorkout