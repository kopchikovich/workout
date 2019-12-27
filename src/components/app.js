import React, {Component} from 'react'
import './app.css'
import training_db from '../data'
import Header from './header'
import Main from './main'
import Footer from './footer'
import ModalWindow from './modal-window'
import ModalForm from './modal-form'


class App extends Component {

    state = {
        screen: 'index',
        headerText: '',
        isLogin: true,
        trainingKey: '',
        modal: {
            isVisible: false,
            header: '',
            content: ''
        }
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
        this.closeModal(e, true);
    }

    openWorkoutScreen(e) {
        if (!this.state.isLogin) {
            document.controller.renderMessage('Для тренировки необходимо выполнить вход в аккаунт', '#a00');
            return;
        }
        const training = training_db[e.target.value];
        if (training.type === 'power') {
            this.setState({
                screen: 'workout',
                trainingKey: e.target.value
            })
        } else if (training.type === 'running' || training.type === 'swimming') {
            this.openModal(training.name, <ModalForm training={training} recordCardioWorkout={this.recordCardioWorkout.bind(this)} closeModal={this.closeModal.bind(this)} />)
        } else {
            this.openModal('Error', 'Some arror, check app.js')
        }
    }

    recordCardioWorkout(e, training) {
        const workout = {
            name: training.name,
            type: training.type,
            timeStop: new Date(),
            duration: e.target[0].value,
            distance: e.target[1].value
        };

        const dateString = `${workout.timeStop.getFullYear()}-${workout.timeStop.getMonth()+1}-${workout.timeStop.getDate()}`;
        if (!localStorage.getItem(dateString)) {
            localStorage.setItem(dateString, JSON.stringify([workout]));
        } else {
            let array = JSON.parse(localStorage.getItem(dateString));
            array.push(workout);
            localStorage.setItem(dateString, JSON.stringify(array));
        }
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