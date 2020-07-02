import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import localData from '@/data/LocalData'
import { Calendar } from '@/components/month'

// const dbName = 'users'
const dbName = 'test'

class CloudData {
  constructor(dbName) {
    // firebase.initializeApp({
    //   apiKey: 'AIzaSyAwC7CYUq5hC-a3wbJ-Io9oOl7HCDes-g8',
    //   authDomain: 'my-awesome-workout-diary.firebaseapp.com',
    //   projectId: 'my-awesome-workout-diary'
    // })
    this.cloudDb = firebase.firestore()
    this.user = this.cloudDb.doc(`${dbName}/kopchikovich`)
  }

  _printError(error) {
    console.log(error.code + ' : ' + error.message)
    document.controller.renderMessage(`${error.code} : ${error.message}`, 'red')
  }

  signIn(email, password, setAppState) {
    return firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('user-name', firebase.auth().currentUser.displayName)
      console.log('Sign in as', localStorage.getItem('user-name'))
      document.controller.renderMessage(`Привет, ${firebase.auth().currentUser.displayName}!`, 'green')
      setAppState({
        isLogin: true
      })
      this.getUserWorkoutTemplates().then(() => {
        setAppState({
          screen: 'index'
        })
      })
      this.getUserExercises()
      // get last 2 month workouts
      const date = new Date()
      this.getMonthWorkouts(date)
      date.setDate(1)
      date.setMonth(date.getMonth() - 1)
      this.getMonthWorkouts(date)
    }).catch(this._printError)
  }

  signOut() {
    firebase.auth().signOut().then(() => {
      console.log('Sign out')
      document.controller.renderMessage(`До свидания, ${localStorage.getItem('user-name')}`, 'green')
      localStorage.clear()
    }).catch(this._printError)
  }

  getUserData() {
    localStorage.setItem('user-name', firebase.auth().currentUser.displayName)
    return this.user.get().then((doc) => {
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

  recordWorkout(workout) {
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
    document.controller.workoutAppendPromise = this.user
        .collection(`workouts/${workoutYear}/${workoutMonthNameEng}`)
        .add(workout)
        .then((docRef) => {
          console.log('Workout written with ID: ', docRef.id)
          document.controller.renderMessage(`Тренировка записана в облако`, 'green')
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
            }).then(this.getUserData)
          }
          // remove backup
          document.controller.workoutAppendPromise = null
          localStorage.removeItem('workout-backup')
        })
        .catch(this._printError)
  }

  getMonthWorkouts(date) {
    const year = date.getFullYear()
    const monthNameEng = Calendar.prototype.getMonthNameInEng(date.getMonth())
    return this.user.collection(`workouts/${year}/${monthNameEng}`).get().then((querySnapshot) => {
      if (querySnapshot.docs.length > 0) {
        querySnapshot.forEach((doc) => {
          const workout = doc.data()
          const MILLISECONDS_IN_SECONDS = 1000
          const workoutDate = new Date(+workout.timeStop.seconds*MILLISECONDS_IN_SECONDS)
          const dateString = `${year}-${workoutDate.getMonth()+1}-${workoutDate.getDate()}`
          if (localStorage.getItem(dateString)) {
            const workoutsArray = JSON.parse(localStorage.getItem(dateString))
            const isSame = (elem) => {
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
        document.controller.renderMessage(`В ${monthName} нет тренировок записанных в облако`, 'green')
      }
    }).catch(this._printError)
  }

  getUserExercises() {
    return this.user.collection('exercises').get().then((querySnapshot) => {
      const exercises = {}
      if (querySnapshot.docs.length > 0) {
        querySnapshot.forEach((doc) => {
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
    return this.user.collection('workoutTemplates').get().then((querySnapshot) => {
      const workoutTemplates = {}
      if (querySnapshot.docs.length > 1) {
        querySnapshot.forEach((doc) => {
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