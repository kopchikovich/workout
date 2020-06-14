import React from 'react'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { user, firebase_getUserData, firebase_signOut, firebase_recordWorkout, firebase_getUserWorkoutTemplates, firebase_getUserExercises, firebase_getMonthWorkouts } from './firebase'
import './app.css'
import Local_db from './local-db'
import Header from './components/header'
import Main from './components/main'
import Footer from './components/footer'
import ModalWindow from './components/modal-window'
import ModalForm from './components/modal-form'
import Login from './screens/login'


class App extends React.Component {

  state = {
    screen: 'login',
    darkTheme: localStorage.getItem('dark-theme') === 'true'? true : false,
    isLogin: false,
    headerText: '',
    workoutTemplateKey: '',
    modal: {
      isVisible: false,
      header: '',
      content: ''
    }
  }

  render() {
    return (
      <div className='app'>

        {this.state.isLogin? null : <Login login={this.login.bind(this)} />}

        <Header
          state={this.state}
        />

        <Main
          state={this.state}
          switchScreen={this.switchScreen.bind(this)}
          switchTheme={this.switchTheme.bind(this)}
          openWorkoutScreen={this.openWorkoutScreen.bind(this)}
          printHeader={this.printHeader.bind(this)}
          login={this.login.bind(this)}
          logout={this.logout.bind(this)}
          openModal={this.openModal.bind(this)}
          closeModal={this.closeModal.bind(this)}
        />

        <Footer
          screen={this.state.screen}
          switchScreen={this.switchScreen.bind(this)}
        />

        <ModalWindow
          isVisible={this.state.modal.isVisible}
          header={this.state.modal.header}
          content={this.state.modal.content}
          closeModal={this.closeModal.bind(this)}
        />
      </div>
    )
  }

  switchScreen(e) {
    this.setState({
      headerText: '',
      screen: e.target.value
    })
    this.closeModal(e, true)
  }

  switchTheme(setCurrent = false) {
    // 0 - dark theme, 1 - ligth theme
    const colors = {
      '--main-bg-color': ['#333', '#fff'],
      '--second-bg-color': ['#61dafb', '#f55'],
      '--main-text-color': ['#ddd', '#222'],
      '--second-text-color': ['#333', '#fff'],
      '--modal-bg-color': ['#666', '#ddd'],
      '--modal-text-color': ['#fff', '#111']
    }
    const root = document.querySelector('html')
    let themeIndex = 0
    if (setCurrent) {
      themeIndex = this.state.darkTheme? 0 : 1
    } else if (!this.state.darkTheme) {
      themeIndex = 0
      this.setState({
        darkTheme: true
      })
    } else {
      themeIndex = 1
      this.setState({
        darkTheme: false
      })
    }
    if (this.state.isLogin) {
      user.update({
        darkTheme: !themeIndex
      }).then(firebase_getUserData).catch((e) => console.error(e))
    }
    Object.keys(colors).forEach((color) => {
      root.style.setProperty(color, colors[color][themeIndex])
    })
  }

  openWorkoutScreen(e) {
    if (!this.state.isLogin) {
      return document.controller.renderMessage('Для тренировки необходимо выполнить вход в аккаунт', '#a00')
    }
    const workoutTemplate_db = new Local_db('workout-templates').open()
    const workoutTemplate = workoutTemplate_db[e.target.value]
    if (workoutTemplate.type === 'power') {
      this.setState({
        screen: 'workout',
        workoutTemplateKey: e.target.value
      })
    } else if (workoutTemplate.type === 'running' || workoutTemplate.type === 'swimming') {
      this.openModal(workoutTemplate.name, <ModalForm workoutTemplate={workoutTemplate} recordCardioWorkout={this.recordCardioWorkout.bind(this)} closeModal={this.closeModal.bind(this)} />)
    } else {
      this.openModal('Error', 'Some arror, check app.js')
    }
  }

  recordCardioWorkout(e, workoutTemplate) {
    const workout = {
      name: workoutTemplate.name,
      type: workoutTemplate.type,
      timeStop: new Date(),
      duration: e.target[0].value,
      distance: e.target[1].value
    }

    const dateString = `${workout.timeStop.getFullYear()}-${workout.timeStop.getMonth()+1}-${workout.timeStop.getDate()}`
    if (!localStorage.getItem(dateString)) {
      localStorage.setItem(dateString, JSON.stringify([workout]))
    } else {
      let array = JSON.parse(localStorage.getItem(dateString))
      array.push(workout)
      localStorage.setItem(dateString, JSON.stringify(array))
    }
    document.controller.renderMessage('Тренировка записана', 'green')

    // make backup and append workout to firestore
    localStorage.setItem('workout-backup', JSON.stringify(workout))
    firebase_recordWorkout(workout)
  }

  printHeader(text) {
    this.setState({
      headerText: text
    })
  }

  openModal(header, content) {
    this.setState({
      modal: {
        isVisible: true,
        header,
        content
      }
    })
  }

  closeModal(e, forcibly) {
    if (forcibly || e.target === e.currentTarget) {
      this.setState({
        modal: {
          isVisible: false,
          header: '',
          content: ''
        }
      })
    }
  }

  isLogin() {
    return !!firebase.auth().currentUser
  }

  login(e) {
    e.preventDefault()
    const form = e.target
    const USER_NAME = 'user-name'

    firebase.auth().signInWithEmailAndPassword(form.email.value, form.password.value).then(() => {
      localStorage.setItem(USER_NAME, firebase.auth().currentUser.displayName)
      console.log('Sign in as', localStorage.getItem(USER_NAME))
      document.controller.renderMessage(`Привет, ${firebase.auth().currentUser.displayName}!`, 'green')
      this.setState({
        isLogin: true
      })
      firebase_getUserWorkoutTemplates().then(() => {
        this.setState({
          screen: 'index'
        })
      })
      firebase_getUserExercises()
      firebase_getUserData().then(() => {
        this.setState({
          darkTheme: localStorage.getItem('dark-theme') === 'true'? true : false
        })
        this.switchTheme(true)
      })
      // get last 2 month workouts
      const date = new Date()
      firebase_getMonthWorkouts(date)
      date.setDate(1)
      date.setMonth(date.getMonth() - 1)
      firebase_getMonthWorkouts(date)
    }).catch((error) => {
      console.log(error.code + ' : ' + error.message)
      document.controller.renderMessage(`${error.code} : ${error.message}`, 'red')
      form.classList.add('shake')
      setTimeout(() => {
        form.classList.remove('shake')
      }, 300)
    })
  }

  logout() {
    firebase_signOut()
    this.setState({
      isLogin: false,
      screen: 'login'
    })
  }

  componentDidMount() {
    // set current theme
    this.switchTheme(true)
    // check is login
    const checkLogin = () => {
      const CHECK_NUMBER = 10
      const CHECK_INTERVAL = 1000
      let checkCounter = 0
      let loginCheckTimeout = setInterval(() => {
        this.setState({
          isLogin: this.isLogin()
        })
        checkCounter++
        if (checkCounter >= CHECK_NUMBER || this.isLogin()) {
          clearInterval(loginCheckTimeout)
          // check backup
          if (localStorage.getItem('backup-workout-template-key')) {
            this.openWorkoutScreen({target: {value: JSON.parse(localStorage.getItem('backup-workout-template-key'))}})
          } else {
            this.setState({
              screen: 'index'
            })
          }
        }
      }, CHECK_INTERVAL)
    }
    if (localStorage.getItem('user-name')) checkLogin()
  }
}

export default App