import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import localData from './LocalData'
import { Calendar } from '../components/month/month'
import { dispatch } from '../store/store'
import { renderMessage, setWorkoutPromiseLink, setIsLogin } from '../store/actions'

const dbName: string = 'users'
// const dbName: string = 'test'

class CloudData {
  cloudDb: any
  user: any

  constructor(dbName: string) {
    firebase.initializeApp({
      apiKey: 'AIzaSyAwC7CYUq5hC-a3wbJ-Io9oOl7HCDes-g8',
      authDomain: 'my-awesome-workout-diary.firebaseapp.com',
      projectId: 'my-awesome-workout-diary'
    })
    this.cloudDb = firebase.firestore()
    this.user = localStorage.getItem('user-name')
        ? this.cloudDb.doc(`${dbName}/${localStorage.getItem('user-name')}`)
        : null
  }

  _printError(error: any) {
    console.log(error.code + ' : ' + error.message)
    dispatch(renderMessage(`${error.code} : ${error.message}`, 'red'))
  }

  signIn(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      // @ts-ignore
      const USER_NAME: string = email.includes('demo')? 'demo-user' : firebase.auth().currentUser.displayName
      this.user = this.cloudDb.doc(`${dbName}/${USER_NAME}`)
      localStorage.setItem('user-name', USER_NAME)
      dispatch(renderMessage(`Привет, ${USER_NAME}!`, 'green'))
      dispatch(setIsLogin(true))
      this.getUserExercises()
    }).catch((er) => {
      const form: any = document.querySelector('.login')
      form.classList.add('shake')
        setTimeout(() => form.classList.remove('shake'), 300);
      this._printError(er)
    })
  }

  signOut() {
    firebase.auth().signOut().then(() => {
      dispatch(renderMessage(`До свидания, ${localStorage.getItem('user-name')}`, 'green'))
      localStorage.clear()
    }).catch(this._printError)
  }

  isLogin() {
    return !!firebase.auth().currentUser
  }

  getUserData() {
    // @ts-ignore
    localStorage.setItem('user-name', firebase.auth().currentUser.displayName || 'demo-user')
    return this.user.get().then((doc: any) => {
      if (doc.exists) {
        const userData = doc.data()
        const METERS_IN_KILOMETERS = 1000
        localStorage.setItem('user-mileage', `${(userData.mileageInMeters/METERS_IN_KILOMETERS).toFixed(1)}`)
        localStorage.setItem('user-last-workout', userData.lastWorkout)
        localStorage.setItem('last-workouts', userData.lastWorkouts)
        localStorage.setItem('dark-theme', userData.darkTheme)
      }
    }).catch(this._printError)
  }

  recordWorkout(workout: any) {
    // get workout date data
    const workoutDate = typeof workout.timeStop === 'string'? new Date(workout.timeStop) : workout.timeStop
    const workoutMonth = workoutDate.getMonth()
    const workoutYear = workoutDate.getFullYear()
    const workoutMonthNameEng = Calendar.prototype.getMonthNameInEng(workoutMonth)
    // record last workout string
    let workoutMonthName = Calendar.prototype.getMonthName(workoutMonth).toLowerCase()
    workoutMonthName = workoutMonth === 2 || workoutMonth === 7 ? workoutMonthName + 'а' : workoutMonthName.slice(0, -1) + 'я'
    const lastWorkoutString = `${workout.name} - ${workoutDate.getDate()} ${workoutMonthName}`
    localStorage.setItem('user-last-workout', lastWorkoutString)
    // record workout data to cloud
    dispatch(setWorkoutPromiseLink(
      this.user
        .collection(`workouts/${workoutYear}/${workoutMonthNameEng}`)
        .add(workout)
        .then((docRef: any) => {
          console.log('Workout written with ID: ', docRef.id)
          // @ts-ignore
          dispatch(renderMessage(`Тренировка записана`, 'green'))
          // write last workout id and string
          this.user.update({
            lastWorkoutId: docRef.id,
            lastWorkout: lastWorkoutString,
            lastWorkouts: localStorage.getItem('last-workouts')
          })
          // update mileage
          if (workout.type === 'running') {
            this.user.update({
              mileageInMeters: firebase.firestore.FieldValue.increment(+workout.distance)
            }).then(() => this.getUserData())
          }
          // remove backup
          dispatch(setWorkoutPromiseLink(null))
          localStorage.removeItem('workout-backup')
        })
        .catch(this._printError)
    ))
  }

  getMonthWorkouts(date: Date) {
    const year = date.getFullYear()
    const monthNameEng = Calendar.prototype.getMonthNameInEng(date.getMonth())
    return this.user.collection(`workouts/${year}/${monthNameEng}`).get().then((querySnapshot: any) => {
      if (querySnapshot.docs.length > 0) {
        querySnapshot.forEach((doc: any) => {
          const workout = doc.data()
          const MILLISECONDS_IN_SECONDS = 1000
          const workoutDate = new Date(+workout.timeStop.seconds*MILLISECONDS_IN_SECONDS)
          const dateString = `${year}-${workoutDate.getMonth()+1}-${workoutDate.getDate()}`
          if (localStorage.getItem(dateString)) {
            // @ts-ignore
            const workoutsArray = JSON.parse(localStorage.getItem(dateString))
            const isSame = (elem: any) => {
              return elem.name === workout.name
            }
            if (!workoutsArray.some(isSame)) {
              workoutsArray.push(workout)
              localStorage.setItem(dateString, JSON.stringify(workoutsArray))
            }
          } else {
            localStorage.setItem(dateString, JSON.stringify([workout]))
          }
        })
      } else {
        const monthNum = +date.getMonth()
        let monthName = Calendar.prototype.getMonthName(monthNum).toLowerCase()
        monthName = monthNum === 2 || monthNum === 7 ? monthName + 'е' : monthName.slice(0, -1) + 'е'
        dispatch(renderMessage(`В ${monthName} нет тренировок записанных в облако`, 'green'))
      }
    }).catch(this._printError)
  }

  getUserExercises() {
    return this.user.collection('exercises').get().then((querySnapshot: any) => {
      const exercises: any = {}
      if (querySnapshot.docs.length > 0) {
        querySnapshot.forEach((doc: any) => {
          exercises[doc.id] = doc.data()
        })
      }
      console.log('Get exercises from firebase')
      localStorage.setItem('exercises', JSON.stringify(exercises))
    }).catch(this._printError)
  }

  setUserExercises() {
    const exercises = Object.entries(localData('exercises').open())
    exercises.forEach((exs, i) => {
      this.user.collection('exercises')
          .doc(exs[0])
          .set(exs[1])
          .then(() => {
            if (i === exercises.length-1) {
              console.log('Set exercises on firebase')
            }
          }).catch(this._printError)
    })
  }

  getUserWorkoutTemplates() {
    return this.user.collection('workoutTemplates').get().then((querySnapshot: any) => {
      const workoutTemplates: any = {}
      if (querySnapshot.docs.length > 1) {
        querySnapshot.forEach((doc: any) => {
          workoutTemplates[doc.id] = doc.data()
        })
      }
      console.log('Get workoutTemplates from firebase')
      localStorage.setItem('workout-templates', JSON.stringify(workoutTemplates))
    }).catch(this._printError)
  }

  setUserWorkoutTemplates() {
    const workoutTemplates = Object.entries(localData('workout-templates').open())
    workoutTemplates.forEach((exs, i) => {
      this.user.collection('workoutTemplates')
          .doc(exs[0])
          .set(exs[1])
          .then(() => {
            if (i === workoutTemplates.length-1) {
              console.log('Set workoutTemplates on firebase')
            }
          }).catch(this._printError)
    })
  }
}

export default new CloudData(dbName)