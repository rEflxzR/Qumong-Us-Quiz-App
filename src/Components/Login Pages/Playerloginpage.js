import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'

class Playerloginpage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            gamepin: '',
            authorized: false
        }
        console.log(window.history.state.key)

        this.handleSubmitClick = this.handleSubmitClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        document.title = 'Login | Player'
        console.log("LOGINPAGE MOUNTED FIRST TIME")
    }

    handleChange(evt) {
        this.setState({ gamepin: evt.target.value })
    }

    handleSubmitClick(evt) {
        evt.preventDefault()
        const {gamepin} = this.state

        axios.post('http://localhost:8000/playerlogin', {gamepin}).then((res) => {
            if(!res.data) {
                alert('PLEASE ENTER THE CORRECT GAMEPIN')
            }
            if(res.data) {
                window.localStorage.setItem('playerLoggedIn', true)
                this.setState({ authorized: true })
            }
        })
    }

    render() {
        if(this.state.authorized) {
            return <Redirect to='/playerdashboard' />
        }
        else {
            return (
                <div className="d-flex flex-column" style={{ height: '100vh' }}>
                    <p className="text-center h2" style={{color: 'white', marginTop: '30vh'}}>ENTER YOUR GAMEPIN</p>
                    <div className="d-flex justify-content-center mt-4">
                        <form onSubmit={this.handleSubmitClick}>
                            <input onChange={this.handleChange} style={{ height: '40px' }} id="gamepin" type="number" name="gamepin" placeholder="XXXXXXXX" required />
                            <div className="d-flex justify-content-center">
                            <button className="btn btn-block btn-lg btn-success mt-2"><strong>LOGIN</strong></button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
    }
}

export default withRouter(Playerloginpage)