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
        updated : false 
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
                        <SingleIssue backButtonHandler={this.backButtonHandler}
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
                        <NewIssue newIssueHandler={this.newIssueHandler} />
               </div>
            )
        }
        
        }else {
           
            return <h1>Loading</h1>
        }
    }

    menuClickHandler = () => {
        console.log("im clicking from the menu", this.state.newIssue)
        this.setState ({newIssue : true})
        this.setState ({showAll : false})
    }


    clickHandler = (props) => {
        this.props.selectedIssue(props)
        this.setState({showAll : false})
        this.setState({newIssue : false})
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

    
    render(){
        return(
            <div>
                <NavBar menuClickHandler={this.menuClickHandler}/>

                {this.renderContent()}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return state
}
export default withRouter(connect(mapStateToProps, { selectedIssue, allIssues, storeMyAssignments })(Home))
