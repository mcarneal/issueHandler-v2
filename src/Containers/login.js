import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { login } from '../actions'
import { Button, Input } from 'semantic-ui-react'
import background from '../background.jpg'; // with import
import { findAllEmployees } from '../actions'

class Login extends React.Component{


    state = {
        name : '',
        role :'',
        username: '',
        password: '',
        newUser : false
    }



    loginChangeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    createUser = (e) => {
        e.preventDefault()
    fetch('http://localhost:3000/api/v1/employees',{
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        employee: {
          name: this.state.name,
          role: this.state.role,
          password: this.state.password,
          username: this.state.username
        }
      })
    }).then(res => res.json())
       .then(data => {
           if (data.error){
               alert("Incorrect username or password")
           } else {
               this.updateEmployeeList(data)
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
           
    updateEmployeeList = (data) =>{
        let newEmployeeList = [...this.props.employees, data]
        debugger
        this.props.findAllEmployees(newEmployeeList)
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

    newUserHandler = (e) => {
        e.preventDefault()
        this.setState({newUser : !this.state.newUser})
    }

    loginViewRender = () => {
        if (!this.state.newUser){
        
        return (
            <form className='Login'>
                    <h4>Please Login:</h4>
                   <Input className='login form'
                        type='text' 
                        name='username'
                        placeholder='username'
                        value={this.state.username}
                        onChange={this.loginChangeHandler}
                   />
                           <Input 
                        type='password'
                        name='password'
                        placeholder='password'
                        value={this.state.password}
                        onChange={this.loginChangeHandler}
                    />
                    <Button
                        onClick={this.loginClickHandler}
                    >Login</Button>
                    <br></br>
                    <br></br>
                    <Button
                        onClick={(e)=> this.newUserHandler(e)}
                    >Create Account</Button>


                </form>
        
        )} else {
            return (
                <form className='Login'>
                    <h4>Please Create an account:</h4>
                   <Input className='login form'
                        type='text' 
                        name='username'
                        placeholder='username'
                        value={this.state.username}
                        onChange={this.loginChangeHandler}
                   />
                     <Input 
                        type='password'
                        name='password'
                        placeholder='password'
                        value={this.state.password}
                        onChange={this.loginChangeHandler}
                     />
                     <Input 
                        type='text'
                        name='name'
                        placeholder='name'
                        value={this.state.name}
                        onChange={this.loginChangeHandler}
                    />
                     <Input 
                        type='text'
                        name='role'
                        placeholder='role'
                        value={this.state.role}
                        onChange={this.loginChangeHandler}
                    />

                    <Button
                        onClick={(e)=>this.createUser(e)}
                    >Submit</Button>
                    <br></br>
                    <br></br>
                    <Button
                        onClick={(e)=>this.newUserHandler(e)}
                    >Back</Button>


                </form>

            )}
    }


    render(){
        return(
            <div className='login container'>
                {this.loginViewRender()}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return state
}
export default withRouter(connect(mapStateToProps, { login, findAllEmployees })(Login))
