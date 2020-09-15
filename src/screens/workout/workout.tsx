import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import './workout.css'
import cloudData from '../../data/CloudData'
import localData from '../../data/LocalData'
import Button from '../../components/button/button'
import Sets, { makeSetString } from '../../components/sets/sets'
import Timer from './timer'
import Exercise from './exercise'
import BestSet from '../../components/best-set/best-set'
import { initialState } from '../../store/initialState'
import { openModal, closeModal, switchScreen, setRecordWorkoutLink, writeHeader } from '../../store/actions'
import { dispatch } from '../../store/store'

// workoutTemplate это шаблон тренировки (тренировка в базе данных)
// workout это практическая тренировка, действие. Запись которой и происходит

type propTypes = {
  dispatch: Dispatch
  workoutTemplateKey: string
  resetRestTimer: any
}

class ScreenWorkout extends React.Component {
  exerciseDb: any
  workoutTemplate: any
  workout: any
  props: any
  state: any
  backup: boolean

  constructor(props: propTypes) {
    super(props)
    // @ts-ignore
    this.workoutTemplate = localData('workout-templates').open()[this.props.workoutTemplateKey]
    this.exerciseDb = localData('exercises').open()
    this.backup = !!localStorage.getItem('backup-workout-template-key')
    if (this.backup) {
      // @ts-ignore
      const backupData = JSON.parse(localStorage.getItem('backup-workout-data'))
      this.workout = {
        name: backupData.name,
        type: backupData.type,
        timeStart: new Date(backupData.timeStart),
        timeStop: '',
        durationInMinutes: ''
      }
      // @ts-ignore
      this.state = {...JSON.parse(localStorage.getItem('backup-workout-state'))}
      dispatch(writeHeader(backupData.name))
    } else {
      this.workout = {
        name: this.workoutTemplate.name,
        type: this.workoutTemplate.type,
        timeStart: new Date(),
        timeStop: '',
        durationInMinutes: ''
      }
      this.state = {
        currentExs: this.exerciseDb[this.workoutTemplate.exercises[0]],
        currentExsIndex: 0,
        bestSet: this.getBestSet(this.exerciseDb[this.workoutTemplate.exercises[0]]),
        exercises: {}
      }
    }
  }

  render() {
    let backupRestTimer: any = null
    let backupTimer: any = null
    if (this.backup) {
      // @ts-ignore
      backupRestTimer = JSON.parse(localStorage.getItem('backup-rest-timer'))
      // @ts-ignore
      backupTimer = JSON.parse(localStorage.getItem('backup-timer'))
    }
    return (
      <section className='training-table'>
        <section className='training-table__cell training-table__cell--timers'>
          <article className='timer'>
            {
              backupRestTimer
                // @ts-ignore
                ? <Timer control={true} minutes={backupRestTimer.minutes} seconds={backupRestTimer.seconds} />
                // @ts-ignore
                : <Timer control={true} />
            }
          </article>
          <article className='timer'>
            {
              backupTimer
                // @ts-ignore
                ? <Timer minutes={backupTimer.minutes} seconds={backupTimer.seconds} />
                : <Timer />
            }
          </article>
        </section>
        <article className='training-table__cell training-table__cell--exercise exercise'>
          <Exercise
            state={this.state}
            workoutTemplate={this.workoutTemplate}
            switchExercise={this.switchExercise.bind(this)}
            recordSet={this.recordSet.bind(this)}
          />
          <BestSet set={this.state.bestSet} />
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
          // @ts-ignore
          onClickHandler={this.confirmExit.bind(this)}
          value='index'
        />
      </section>
    )
  }

  switchExercise(e: any) {
    let newExs = null
    let newExsIndex = 0
    if (e.target.value === 'prev') {
      newExsIndex = this.state.currentExsIndex-1 <= 0? 0 : this.state.currentExsIndex-1
    } else if (e.target.value === 'next') {
      newExsIndex = this.state.currentExsIndex+1 >= this.workoutTemplate.exercises.length-1? this.workoutTemplate.exercises.length-1 : this.state.currentExsIndex+1
    } else {
      return null
    }
    newExs = this.exerciseDb[this.workoutTemplate.exercises[newExsIndex]]
    this.setState({
      currentExs: newExs,
      currentExsIndex: newExsIndex,
      bestSet: this.getBestSet(newExs)
    })
    // save backup
    localStorage.setItem('backup-workout-state', JSON.stringify(this.state))
  }

  recordSet(e: any) {
    e.preventDefault()
    const options: Array<any> = Array.from(e.target.elements).filter((el: any) => el.nodeName !== 'BUTTON')
    const set: any = {}
    for (let i = 0; i < options.length; i++) {
      set[options[i].name] = options[i].value
    }
    const currentExsLink: any = this.state.exercises[this.state.currentExs.name]
    let sets: any = null
    if (currentExsLink) {
      sets = Array.from(currentExsLink)
      sets.push(set)
    } else {
      sets = [set]
    }
    this.setState({
      exercises: Object.assign(this.state.exercises, {[this.state.currentExs.name]: sets})
    })
    this.props.resetRestTimer()
    // save backup
    localStorage.setItem('backup-workout-state', JSON.stringify(this.state))
  }

  deleteSet(index: string | number) {
    const currentExsLink: any = this.state.exercises[this.state.currentExs.name]
    const sets: Array<any> = Array.from(currentExsLink)
    sets.splice(+index, 1)
    this.setState({
      exercises: Object.assign(this.state.exercises, {[this.state.currentExs.name]: sets})
    })
    // save backup
    localStorage.setItem('backup-workout-state', JSON.stringify(this.state))
  }

  getBestSet(exercise: any) {
    if (exercise.bestSet) {
      return makeSetString(exercise.bestSet)
    }
    return null
  }

  recordBestSets() {
    const findBestSet = (sets: Array<any>) => {
      if (sets.length === 1) {
        return sets[0]
      }
      let bestSetIndex = 0
      sets.forEach((el, i) => {
        if (bestSetIndex === i) return null
        if (el['time'] || el['time-left']) {
          const TIME_NAME = el['time']? 'time' : 'time-left'
          const bestTime = sets[bestSetIndex][TIME_NAME].split(':')
          const setTime = el[TIME_NAME].split(':')
          if (bestTime[0] > setTime[0]) {
            return null
          } else if (bestTime[0] === setTime[0]) {
            if (bestTime[1] > setTime[1]) {
              return null
            } else if (bestTime[1] === setTime[1]) {
              return null
            }
          }
          bestSetIndex = i
        } else if (el['weight']) {
          const bestWeight = +sets[bestSetIndex]['weight']
          const setWeight = +el['weight']
          if (bestWeight < setWeight) {
            bestSetIndex = i
          } else if (bestWeight === setWeight) {
            const REPEATS_NAME = el['repeats']? 'repeats' : 'repeats-left'
            if (+sets[bestSetIndex][REPEATS_NAME] < +el[REPEATS_NAME]) {
              bestSetIndex = i
            }
          }
        } else if (el['repeats'] || el['repeats-left']) {
          const REPEATS_NAME = el['repeats']? 'repeats' : 'repeats-left'
            if (+sets[bestSetIndex][REPEATS_NAME] < +el[REPEATS_NAME]) {
              bestSetIndex = i
            }
        }
      })
      return sets[bestSetIndex]
    }
    Object.keys(this.state.exercises).forEach((name: string) => {
      const exercise: any = Object.values(this.exerciseDb).find((el: any) => el.name === name)
      const bestSet = findBestSet(this.state.exercises[exercise.name])
      if (!exercise.bestSet) {
        exercise.bestSet = bestSet
      } else {
        exercise.bestSet = findBestSet([exercise.bestSet, bestSet])
      }
    })
    localData('exercises').save(this.exerciseDb)
    cloudData.setUserExercises()
  }

  getLastWorkoutSets() {
    let lastSets: any = null
    // @ts-ignore
    const lastAllWorkouts: any = JSON.parse(localStorage.getItem('last-workouts'))
    const isLastWorkoutExist: boolean = lastAllWorkouts && lastAllWorkouts[this.workout.name]
    // @ts-ignore
    const lastWorkout: any = isLastWorkoutExist? JSON.parse(localStorage.getItem(lastAllWorkouts[this.workout.name])) : null
    if (lastWorkout) {
      const lastWorkoutData: any = lastWorkout.find((el: any) => {
        return el.name === this.workout.name
      })
      if (Object.keys(lastWorkoutData.exercises).includes(this.state.currentExs.name)) {
        lastSets = lastWorkoutData.exercises[this.state.currentExs.name]
      }
    } else if (isLastWorkoutExist) {
      cloudData.getMonthWorkouts(new Date(lastAllWorkouts[this.workout.name]))
    }
    return lastSets
  }

  recordWorkout(e: any) {
    const MILLISECONDS_IN_MINUTE: number = 60000
    const date: Date = this.workout.timeStop = new Date()
    this.workout.durationInMinutes = Math.floor((this.workout.timeStop - this.workout.timeStart)/MILLISECONDS_IN_MINUTE)
    const workout: any = Object.assign(this.workout, {exercises: this.state.exercises})
    const dateString: string = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    if (!localStorage.getItem(dateString)) {
      localStorage.setItem(dateString, JSON.stringify([workout]))
    } else {
      // @ts-ignore
      const array = JSON.parse(localStorage.getItem(dateString))
      array.push(workout)
      localStorage.setItem(dateString, JSON.stringify(array))
    }
    // записываю тренировку в список последних тренировок по названию
    // @ts-ignore
    const lastWorkouts: any = JSON.parse(localStorage.getItem('last-workouts'))
    lastWorkouts[workout.name] = dateString
    localStorage.setItem('last-workouts', JSON.stringify(lastWorkouts))
    // переключаю экран
    this.props.dispatch(closeModal())
    this.props.dispatch(switchScreen('index'))
    // make backup and append workout to firestore
    localStorage.setItem('workout-backup', JSON.stringify(workout))
    cloudData.recordWorkout(workout)
    this.recordBestSets()
  }

  confirmExit(e: any, isWorkoutEnd: boolean) {
    let content: any = null
    if (isWorkoutEnd) {
      content = (
        <>
          <p>Тренировка действительно закончилась?</p>
          <div className='modal__buttons'>
            <Button title='Да' onClickHandler={this.recordWorkout.bind(this)} value='index' />
            <Button title='Нет' onClickHandler={() => this.props.dispatch(closeModal())} />
          </div>
        </>
      )
    } else {
      content = (
        <>
          <p>Вернуться к списку тренировок без сохранения данных?</p>
          <div className='modal__buttons'>
            <Button title='Да' onClickHandler={() => {
              this.props.dispatch(switchScreen('index'))
              this.props.dispatch(closeModal())
            }} />
            <Button title='Нет' onClickHandler={() => this.props.dispatch(closeModal())} />
          </div>
        </>
      )
    }
    this.props.dispatch(openModal('Выход', content))
  }

  componentDidMount() {
    // add save workout link for footer button
    this.props.dispatch(setRecordWorkoutLink(this.confirmExit.bind(this)))
    // save backup
    localStorage.setItem('backup-workout-state', JSON.stringify(this.state))
    localStorage.setItem('backup-workout-data', JSON.stringify(this.workout))
    localStorage.setItem('backup-workout-template-key', JSON.stringify(this.props.workoutTemplateKey))
  }

  componentWillUnmount() {
    this.props.dispatch(setRecordWorkoutLink(null))
    // remove backup
    localStorage.removeItem('backup-workout-state')
    localStorage.removeItem('backup-workout-data')
    localStorage.removeItem('backup-workout-template-key')
  }
}

const mapStateToProps = (state: typeof initialState) => {
  return {
    workoutTemplateKey: state.workoutTemplateKey,
    resetRestTimer: state.resetTimerLink
  }
}

// @ts-ignore
export default connect(mapStateToProps)(ScreenWorkout)