import React, {Component} from 'react'
import './app.css'
import Header from './header'
import Main from './main'
import Footer from './footer'


class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            screen: 'index',
            headerText: ''
        }
    }

    render() {
        return (
            <div className='app'>

                <Header
                    screen={this.state.screen}
                    text={this.state.headerText}
                />

                <Main
                    state={this.state}
                    printHeader={this.printHeader.bind(this)}
                />

                <Footer
                    screen={this.state.screen}
                    switchScreen={this.switchScreen.bind(this)}
                />

            </div>
        )
    }

    switchScreen(e) {
        this.setState({
            headerText: '',
            screen: e.target.value
        })
    }

    printHeader(text) {
        this.setState({
            headerText: text
        })
    }
}

export default App