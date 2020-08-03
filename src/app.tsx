import React from 'react'
import './app.css'
import cloudData from '@/data/CloudData'
import localData from '@/data/LocalData'
import Header from '@/components/header/header'
import Main from '@/components/main/main'
import Footer from '@/components/footer/footer'
import ModalWindow from '@/components/modal-window'
import ModalForm from '@/components/modal-form'
import ScreenLogin from '@/screens/login'


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

        {this.state.isLogin? null : <ScreenLogin login={this.login.bind(this)} />}

        <Header state={this.state} />

        <Main
          state={this.state}
          switchScreen={this.switchScreen.bind(this)}
          switchTheme={this.switchTheme.bind(this)}
          openWorkoutScreen={this.openWorkoutScreen.bind(this)}
          writeHeader={this.writeHeader.bind(this)}
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
      cloudData.user.update({
        darkTheme: !themeIndex
      }).then(() => cloudData.getUserData()).catch((e) => console.error(e))
    }
    Object.keys(colors).forEach((color) => {
      root.style.setProperty(color, colors[color][themeIndex])
    })
  }

  openWorkoutScreen(e) {
    if (!this.state.isLogin) {
      return document.controller.renderMessage('Для тренировки необходимо выполнить вход в аккаунт', '#a00')
    }
    const workoutTemplateDb = localData('workout-templates').open()
    const workoutTemplate = workoutTemplateDb[e.target.value]
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
      const array = JSON.parse(localStorage.getItem(dateString))
      array.push(workout)
      localStorage.setItem(dateString, JSON.stringify(array))
    }
    document.controller.renderMessage('Тренировка записана', 'green')
    // make backup and append workout to firestore
    localStorage.setItem('workout-backup', JSON.stringify(workout))
    cloudData.recordWorkout(workout)
  }

  writeHeader(text) {
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

  login(e) {
    e.preventDefault()
    cloudData.signIn(e.target.email.value, e.target.password.value, this.setState.bind(this))
        .then(() => {
          cloudData.getUserData().then(() => {
            this.setState({
              darkTheme: localStorage.getItem('dark-theme') === 'true'? true : false
            })
            this.switchTheme(true)
          })
        })
  }

  logout() {
    cloudData.signOut()
    this.setState({
      isLogin: false,
      screen: 'login'
    })
  }

  checkLogin() {
    const CHECK_NUMBER = 10
    const CHECK_INTERVAL = 1000
    let checkCounter = 0
    const loginCheckTimeout = setInterval(() => {
      this.setState({
        isLogin: cloudData.isLogin()
      })
      checkCounter++
      if (checkCounter >= CHECK_NUMBER || cloudData.isLogin()) {
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

  componentDidMount() {
    // set current theme
    this.switchTheme(true)
    // check is login
    if (localStorage.getItem('user-name')) this.checkLogin()
  }
}

export default App