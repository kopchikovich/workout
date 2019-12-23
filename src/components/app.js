import React, {Component} from 'react'
import './app.css'
import Header from './header'
import Main from './main'
import Footer from './footer'
import ModalWindow from './modal-window'


class App extends Component {

    state = {
        screen: 'index',
        headerText: '',
        isLogin: true,
        trainingKey: ''
    }

    render() {
        return (
            <div className='app'>

                <Header
                    state={this.state}
                />

                <Main
                    state={this.state}
                    switchScreen={this.switchScreen.bind(this)}
                    openWorkoutScreen={this.openWorkoutScreen.bind(this)}
                    printHeader={this.printHeader.bind(this)}
                    login={this.login.bind(this)}
                    logout={this.logout.bind(this)}
                />

                <Footer
                    screen={this.state.screen}
                    switchScreen={this.switchScreen.bind(this)}
                />

                <ModalWindow header='pjujkjdjr' content='content' />
            </div>
        )
    }

    switchScreen(e) {
        this.setState({
            headerText: '',
            screen: e.target.value
        })
    }
    openWorkoutScreen(e) {
        this.setState({
            screen: 'workout',
            trainingKey: e.target.value
        })
    }

    printHeader(text) {
        this.setState({
            headerText: text
        })
    }

    login(e) {
        e.preventDefault()
        const form = e.target
        if (form.email.value === '1@2.3' && form.password.value === '123') {
            this.setState({
                isLogin: true
            })
        } else {
            form.classList.add('shake')
            setTimeout(() => {
                form.classList.remove('shake')
            }, 300);
        }
    }

    logout() {
        this.setState({
            isLogin: false
        })
    }
}

export default App