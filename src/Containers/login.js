import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { login } from '../actions'

class Login extends React.Component{


    state = {
        username: '',
        password: ''
    }


    loginChangeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    loginClickHandler = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/api/v1/login',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
               employee: {
                username: this.state.username,
                password: this.state.password       
               }
            })
        })
        .then(res => res.json())
            .then(data => {
                if (data.error){
                    alert("Incorrect username or password")
                } else {
                    localStorage.setItem('token', data.token)
                    this.props.login(data)
                    this.setState({
                        username : "",
                        password : ""
                    })
                    this.props.history.push('/home')
                }
            })
    }

    render(){
        return(
            <div>
               <form className='Login'>
                   <input 
                        type='text' 
                        name='username'
                        placeholder='username'
                        value={this.state.username}
                        onChange={this.loginChangeHandler}
                   />
                    <input 
                        type='password'
                        name='password'
                        placeholder='password'
                        value={this.state.password}
                        onChange={this.loginChangeHandler}
                    />
                    <button
                        onClick={this.loginClickHandler}
                        >Login</button>

                </form>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return state
}
export default withRouter(connect(mapStateToProps, { login })(Login))
