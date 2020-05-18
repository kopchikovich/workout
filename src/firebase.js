import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import Local_db from './local-db'
import { Calendar } from './components/month'

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyAwC7CYUq5hC-a3wbJ-Io9oOl7HCDes-g8',
  authDomain: 'my-awesome-workout-diary.firebaseapp.com',
  projectId: 'my-awesome-workout-diary'
})

const firebase_db = firebase.firestore()
const user = firebase_db.doc('users/kopchikovich')
// const user = firebase_db.doc('test/kopchikovich')

const printError = (error) => {
  console.log(error.code + ' : ' + error.message)
  document.controller.renderMessage(`${error.code} : ${error.message}`, 'red')
}

const firebase_signOut = () => {
  const USER_NAME = 'user-name'
  firebase.auth().signOut().then(() => {
    console.log('Sign out')
    document.controller.renderMessage(`До свидания, ${localStorage.getItem(USER_NAME)}`, 'green')
    localStorage.clear()
  }).catch(printError)
}

const firebase_getUserData = () => {
  localStorage.setItem('user-name', firebase.auth().currentUser.displayName)
  return user.get().then((doc) => {
    if (doc.exists) {
      const userData = doc.data()
      const METERS_IN_KILOMETERS = 1000
      localStorage.setItem('user-mileage', `${(userData.mileageInMeters/METERS_IN_KILOMETERS).toFixed(1)}`)
      localStorage.setItem('user-last-workout' , userData.lastWorkout)
      localStorage.setItem('last-workouts' , userData.lastWorkouts)
    }
  }).catch(printError)
}

const firebase_recordWorkout = (workout) => {
  // get workout date data
  const workoutDate = typeof workout.timeStop === 'string'? new Date(workout.timeStop) : workout.timeStop
  const workoutMonth = workoutDate.getMonth()
  const workoutYear = workoutDate.getFullYear()
  const workoutMonthNameEng = Calendar.prototype.getMonthNameInEng(workoutMonth)
  let workoutMonthName = Calendar.prototype.getMonthName(workoutMonth).toLowerCase()

  // record last workout string
  workoutMonthName = workoutMonth === 2 || workoutMonth === 7 ? workoutMonthName + 'а' : workoutMonthName.slice(0, -1) + 'я'
  let lastWorkoutString = `${workout.name} - ${workoutDate.getDate()} ${workoutMonthName}`
  localStorage.setItem('user-last-workout', lastWorkoutString)

  // write workout data to db
  document.controller.workoutAppendPromise = user.collection(`workouts/${workoutYear}/${workoutMonthNameEng}`).add(workout)
  .then(function(docRef) {
    console.log('Workout written with ID: ', docRef.id)
    document.controller.renderMessage(`Тренировка записана в firestore`, 'green')
    // write last workout id and string
    user.update({
      lastWorkoutId: docRef.id,
      lastWorkout: lastWorkoutString,
      lastWorkouts: localStorage.getItem('last-workouts')
    })
    // update mileage
    if (workout.type === 'running') {
      user.update({
        mileageInMeters: firebase.firestore.FieldValue.increment(+workout.distance)
      }).then(firebase_getUserData)
    }

    // remove backup
    document.controller.workoutAppendPromise = null
    localStorage.removeItem('workout-backup')
  }).catch(printError)
}

const firebase_getMonthWorkouts = (date) => {
  const year = date.getFullYear()
  const monthNameEng = Calendar.prototype.getMonthNameInEng(date.getMonth())
  return firebase_db.collection(`users/kopchikovich/workouts/${year}/${monthNameEng}`).get().then((querySnapshot) => {
    if (querySnapshot.docs.length > 0) {
      querySnapshot.forEach((doc) => {
        const workout = doc.data()
        const MILLISECONDS_IN_SECONDS = 1000
        const workoutDate = new Date(+workout.timeStop.seconds*MILLISECONDS_IN_SECONDS)
        const dateString = `${year}-${workoutDate.getMonth()+1}-${workoutDate.getDate()}`
        if (localStorage.getItem(dateString)) {
          let workoutsArray = JSON.parse(localStorage.getItem(dateString))
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
      document.controller.renderMessage(`В ${monthName} нет тренировок записанных в firestore`, 'green')
    }
  }).catch(printError)
}

const firebase_getUserExercises = () => {
  return user.collection('exercises').get().then((querySnapshot) => {
    const exercises = {}
    if (querySnapshot.docs.length > 0) {
      querySnapshot.forEach((doc) => {
        exercises[doc.id] = doc.data()
      })
    }
    console.log('Get exercises from firebase')
    localStorage.setItem('exercises', JSON.stringify(exercises))
  }).catch(printError)
}
const firebase_setUserExercises = () => {
  const exercises = Object.entries(new Local_db('exercises').open())
  exercises.forEach((exs, i) => {
    user.collection('exercises').doc(exs[0]).set(exs[1])
      .then(() => {
        if (i === exercises.length-1) {
          console.log('Set exercises on firebase')
        }
      }).catch(printError)
  })
}

const firebase_getUserWorkoutTemplates = () => {
  return user.collection('workoutTemplates').get().then((querySnapshot) => {
    const workoutTemplates = {}
    if (querySnapshot.docs.length > 1) {
      querySnapshot.forEach((doc) => {
        workoutTemplates[doc.id] = doc.data()
      })
    }
    console.log('Get workoutTemplates from firebase')
    localStorage.setItem('workout-templates', JSON.stringify(workoutTemplates))
  }).catch(printError)
}
const firebase_setUserWorkoutTemplates = () => {
  const workoutTemplates = Object.entries(new Local_db('workout-templates').open())
  workoutTemplates.forEach((exs, i) => {
    user.collection('workoutTemplates').doc(exs[0]).set(exs[1])
      .then(() => {
        if (i === workoutTemplates.length-1) {
          console.log('Set workoutTemplates on firebase')
        }
      }).catch(printError)
  })
}

export {firebase_db, firebase_signOut, firebase_getUserData, firebase_recordWorkout, firebase_getMonthWorkouts, firebase_getUserExercises, firebase_setUserExercises, firebase_getUserWorkoutTemplates, firebase_setUserWorkoutTemplates}