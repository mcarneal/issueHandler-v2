import React ,{ Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { login } from './actions'
import { Route, Switch, withRouter } from "react-router-dom"
import Login from './Containers/login'
import Home from './Containers/home'
import { autoLogin } from './actions'
import { storeMyAssignments } from './actions'
import { findAllEmployees } from './actions'
import background from './background.jpg'; // with import


class App extends Component {




    componentDidMount(){
        let token = localStorage.getItem("token")
        if (token){
            this.props.autoLogin(this.props)
            if(this.props.user){
                this.fetchAssignments()
                this.fetchEmployees()
                this.props.history.push('/home')
                   
                
            }
        } else {
            this.fetchAssignments()
            this.fetchEmployees()
            this.props.history.push('/')
        }
    }

    fetchAssignments = () => {
        fetch('http://localhost:3000/api/v1/assignments')
            .then(res => res.json())
            .then(data =>{
                this.props.storeMyAssignments(data)
            })
    }

    fetchEmployees = () => {
        fetch('http://localhost:3000/api/v1/employees')
            .then(res => res.json())
            .then(data => {
                this.props.findAllEmployees(data)
            })
    }

    render(){
        const sectionStyle = {
            width: "100%",
            height: "100vh",
            backgroundImage: `url(${background})`
        };
        return( 
            <div className= "App" style={ sectionStyle  }>
                <Switch>
                    <Route exact path="/home" render={()=> <Home employee={this.props.user}/>}/>
                    <Route exact path="/" render={()=> <Login />} />
                </Switch>
            </div>


        )
    }
}


const mapStateToProps = (state) => {
    return state
}
export default withRouter(connect(mapStateToProps, { login , autoLogin, storeMyAssignments, findAllEmployees })(App));
