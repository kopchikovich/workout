import React, {Component} from 'react'
import './screen-workout.css'
import training_db from '../data'

class ScreenWorkout extends Component {

    state = {

    }

    render() {
        const training = training_db[this.props.state.trainingKey];
        console.log(training)
        return (
            <h2>{training.description} </h2>
        )
    }
}

export default ScreenWorkout