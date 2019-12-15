import React, {Component} from 'react'
import './app.css'
import Header from './header'
import Main from './main'
import Footer from './footer'


class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            screen: 'index'
        }
    }

    render() {
        return (
            <div className='app'>

                <Header
                    screen={this.state.screen}
                />

                <Main
                    state={this.state}
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
            screen: e.target.value
        })
    }
}

export default App