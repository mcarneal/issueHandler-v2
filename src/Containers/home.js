import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import IssuesContainer from './issuesContainer' 
import MyAssignments from './myAssignments'
import { selectedIssue } from '../actions'
import SingleIssue from './singleIssue'
import NavBar from '../Components/navbar'
import NewIssue from './newIssue'
import profile from '../profile.png'; // with import
import ProfileCard from './profileCard'
import EmployeeCard from './employeeCard'
import { allIssues } from '../actions' 
import { storeMyAssignments } from '../actions'




class Home extends React.Component {

    state = {
        showAll : true,
        newIssue : false,
        updated : false,
        selectedIssue : {}
    }


    renderContent = () => {
        if (this.props.user.username){
            if (this.state.showAll){
                
                return (
                    
                        <div className ='home'>
                            <ProfileCard />
                            <MyAssignments clickHandler={this.clickHandler} />
                            <EmployeeCard />
                            <IssuesContainer clickHandler={this.clickHandler} />
                        </div>
                    
                )             
            } else if (!this.state.showAll && !this.state.newIssue){
                return(
                    
                    <div className ='home'>
                        <ProfileCard />
                        <MyAssignments clickHandler={this.clickHandler} />
                        <SingleIssue 
                                     
                            backButtonHandler={this.backButtonHandler}
                                     changeStatusHandler={this.changeStatusHandler}/>
                        </div>
                       
                )             
               
            }
         else if (this.state.newIssue) {
            return (
                    <div className="home">
                        <ProfileCard />
                        <MyAssignments clickHandler={this.clickHandler} />
                        <EmployeeCard />
                        <NewIssue newIssueHandler={this.newIssueHandler} 
                                  newIssueBackButtonHandler={this.newIssueBackButtonHandler}            
                        />
               </div>
            )
        }
        
        }else {
           
            return <h1>Loading</h1>
        }
    }

    menuClickHandler = () => {
        this.setState ({newIssue : true})
        this.setState ({showAll : false})
    }

        newIssueBackButtonHandler = () => {
            this.setState({showAll : true})
            this.setState({newIssue : false})
    }


    clickHandler = (props) => {
        this.props.selectedIssue(props)
        this.setState({selectedIssue : props})
        this.setState({showAll : false})
        this.setState({newIssue : false})
        debugger
    }

    newIssueHandler = (props) => {
        let updatedIssues = [...this.props.issues, props]
        this.props.allIssues(updatedIssues)
        this.props.selectedIssue(props)
        this.setState({showAll : false})
        this.setState({newIssue : false})
    }

    backButtonHandler = () =>{
        this.setState({showAll : true})
    }

    logOutHandler = () => {
        localStorage.removeItem('token')
        this.props.history.push('/')
    }

    homeButtonHandler = () => {
        this.setState({
            showAll : true,
            newIssue : false,
            updated : false,
            selectedIssue : {}
        })
    }

    render(){
        return(
            <div>
                <NavBar menuClickHandler={this.menuClickHandler}
                        logoutHandler={this.logOutHandler}
                    homeButtonHandler={this.homeButtonHandler}
                />
                {this.renderContent()}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return state
}
export default withRouter(connect(mapStateToProps, { selectedIssue, allIssues, storeMyAssignments })(Home))
