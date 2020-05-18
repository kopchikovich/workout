import React, { Component } from 'react'
import { firebase_recordWorkout, firebase_getMonthWorkouts } from '../../firebase'
import './workout.css'
import Local_db from '../../local-db'
import Button from '../../components/button'
import Timer from './timer'
import Exercise from './exercise'
import Sets from '../../components/sets'

// workoutTemplate это шаблон тренировки (тренировка в базе данных)
// workout это практическая тренировка, действие. Запись которой и происходит

class ScreenWorkout extends Component {

  constructor(props) {
    super(props)

    const workoutTemplate_db = new Local_db('workout-templates').open()
    this.exercise_db = new Local_db('exercises').open()
    this.workoutTemplate = workoutTemplate_db[this.props.state.workoutTemplateKey]
    this.workout = {
      name: this.workoutTemplate.name,
      type: this.workoutTemplate.type,
      timeStart: new Date(),
      timeStop: '',
      durationInMinutes: ''
    }
    this.initialState = {
      currentExs: this.exercise_db[this.workoutTemplate.exercises[0]],
      currentExsIndex: 0,
      exercises: {}
    }
    this.state = this.initialState

    document.controller.recordWorkout = this.confirmExit.bind(this)
  }

  render() {
    return (
      <section className='training-table'>
        <section className='training-table__cell training-table__cell--timers'>
          <article className=' timer'>
            <Timer control={true} />
          </article>
          <article className='timer'>
            <Timer />
          </article>
        </section>
        <article className='training-table__cell training-table__cell--exercise exercise'>
          <Exercise
            state={this.state}
            workoutTemplate={this.workoutTemplate}
            switchExercise={this.switchExercise.bind(this)}
            recordSet={this.recordSet.bind(this)}
            openModal={this.props.openModal}
          />
        </article>
        <article className='training-table__cell training-table__cell--sets sets'>
          <h3 className='sets__header'>Выполнено</h3>
          <div className='sets__scrollable'>
            <Sets
              exercise={this.state.exercises[this.state.currentExs.name]}
              deleteSet={this.deleteSet.bind(this)}
            />
            <h3 className='sets__header sets__header--small'>В прошлый раз</h3>
            <Sets
              exercise={this.getLastWorkoutSets()}
            />
          </div>
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
    let newExs = null
    let newExsIndex = 0

    if (e.target.value === 'prev') {
      newExsIndex = this.state.currentExsIndex-1 <= 0? 0 : this.state.currentExsIndex-1
    } else if (e.target.value === 'next') {
      newExsIndex = this.state.currentExsIndex+1 >= this.workoutTemplate.exercises.length-1? this.workoutTemplate.exercises.length-1 : this.state.currentExsIndex+1
    } else {
      return null
    }
    newExs = this.exercise_db[this.workoutTemplate.exercises[newExsIndex]]

    this.setState({
      currentExs: newExs,
      currentExsIndex: newExsIndex
    })
  }

  recordSet(e) {
    e.preventDefault()
    const options = Array.from(e.target.elements).filter((el) => el.nodeName !== 'BUTTON')
    let set = {}
    for (let i = 0; i < options.length; i++) {
      set[options[i].name] = options[i].value
    }

    const currentExsLink = this.state.exercises[this.state.currentExs.name]
    let sets = null
    if (currentExsLink) {
      sets = Array.from(currentExsLink)
      sets.push(set)
    } else {
      sets = [set]
    }
    this.setState({
      exercises: Object.assign(this.state.exercises, {[this.state.currentExs.name]: sets})
    })

    document.controller.resetRestTimer()
  }

  deleteSet(index) {
    const currentExsLink = this.state.exercises[this.state.currentExs.name]
    let sets = Array.from(currentExsLink)
    sets.splice(+index, 1)
    this.setState({
      exercises: Object.assign(this.state.exercises, {[this.state.currentExs.name]: sets})
    })
  }

  recordWorkout(e) {
    const MILLISECONDS_IN_MINUTE = 60000
    const date = this.workout.timeStop = new Date()
    this.workout.durationInMinutes = Math.floor((this.workout.timeStop - this.workout.timeStart)/MILLISECONDS_IN_MINUTE)
    const workout = Object.assign(this.workout, {exercises: this.state.exercises})
    const dateString = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`

    if (!localStorage.getItem(dateString)) {
      localStorage.setItem(dateString, JSON.stringify([workout]))
    } else {
      let array = JSON.parse(localStorage.getItem(dateString))
      array.push(workout)
      localStorage.setItem(dateString, JSON.stringify(array))
    }

    // записываю тренировку в список последних тренировок по названию
    let lastWorkouts = JSON.parse(localStorage.getItem('last-workouts'))
    lastWorkouts[workout.name] = dateString
    localStorage.setItem('last-workouts', JSON.stringify(lastWorkouts))
    // переключаю экран
    document.controller.renderMessage('Тренировка записана', 'green')
    this.props.switchScreen(e)
    // make backup and append workout to firestore
    localStorage.setItem('workout-backup', JSON.stringify(workout))
    firebase_recordWorkout(workout)
  }

  getLastWorkoutSets() {
    let lastSets = null
    const lastAllWorkouts = JSON.parse(localStorage.getItem('last-workouts'))
    const isLastWorkoutExist = lastAllWorkouts && lastAllWorkouts[this.workout.name]
    const lastWorkout = isLastWorkoutExist? JSON.parse(localStorage.getItem(lastAllWorkouts[this.workout.name])) : null

    if (lastWorkout) {
      const lastWorkoutData = lastWorkout.find((el) => {
        return el.name === this.workout.name
      })
      if (Object.keys(lastWorkoutData.exercises).includes(this.state.currentExs.name)) {
        lastSets = lastWorkoutData.exercises[this.state.currentExs.name]
      }
    } else if (isLastWorkoutExist) {
      firebase_getMonthWorkouts(new Date(lastAllWorkouts[this.workout.name]))
    }
    return lastSets
  }

  confirmExit(e, isWorkoutEnd) {
    let content = null

    if (isWorkoutEnd) {
      content = (
        <>
          <p>Тренировка действительно закончилась?</p>
          <div className='modal__buttons'>
            <Button title='Да' onClickHandler={this.recordWorkout.bind(this)}  value='index' />
            <Button title='Нет' onClickHandler={this.props.closeModal} />
          </div>
        </>
      )
    } else {
      content = (
        <>
          <p>Вернуться к списку тренировок без сохранения данных?</p>
          <div className='modal__buttons'>
            <Button title='Да' onClickHandler={this.props.switchScreen}  value='index' />
            <Button title='Нет' onClickHandler={this.props.closeModal} />
          </div>
        </>
      )
    }
    this.props.openModal('Выход', content)
  }

  componentWillUnmount() {
    delete document.controller.recordWorkout
  }
}

export default ScreenWorkout