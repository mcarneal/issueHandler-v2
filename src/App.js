import React ,{ Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux'
import { login } from './actions'
import { Route, Switch, withRouter } from "react-router-dom"
import Login from './Containers/login'
import Home from './Containers/home'
import { autoLogin } from './actions'


class App extends Component {




    componentDidMount(){
        let token = localStorage.getItem("token")
        if (token){
            this.props.autoLogin(this.props)
            if(this.props.user){
                this.props.history.push('/home')
            }
        } else {
            this.props.history.push('/')
        }
    }


    render(){
        return( 
            <div className= "App">
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
export default withRouter(connect(mapStateToProps, { login , autoLogin })(App));
