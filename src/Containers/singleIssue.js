import React, { Component } from 'react'
import { connect } from 'react-redux'
import IssueNav from '../Components/issueNavBar'
import AllAssignments from './allAssignments'
import { allIssues } from '../actions'
import AddNewAssignment from '../Components/addNewAssignment'
import logo from '../hardware.jpg'; // with import

class SingleIssue extends Component{

    state = {
        statusChanged : false,
        add : false
    }

    changeStatusHandler = (id, completed) => {
        fetch(`http://localhost:3000/api/v1/assignments/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
            completed: completed
            })
        })
    .then(res => res.json())
            .then(data => {
                console.log('inside fetch', data)
                this.updateIssue(data)
            })
    }


    updateIssue = (data) => {
        let issue = this.props.issues.find(issue => issue.id === data.issue_id)
        debugger
        let filteredAssignments = issue.assignments.filter(assignment => assignment.id !== data.id)
        let updatedAssignments = [...filteredAssignments, data]
        issue.assignments = updatedAssignments 
        let filteredIssueArray = this.props.issues.filter(issueObj => issueObj.id !== issue.id)
        let updatedIssueArray = [...filteredIssueArray, issue]
        console.log("updated issue array", updatedIssueArray, "old issue array", this.props.issues)
        debugger
        this.props.allIssues(updatedIssueArray)
    }

    renderAssignments = () => {
        return this.props.issue.assignments.map(assignment => <AllAssignments changeStatusHandler={this.changeStatusHandler} {...assignment}/> )
    }

    addNewHandler = () => {
        this.setState({add: !this.state.add})
    }


    cancelTicketHandler = () => {
            fetch(`http://localhost:3000/api/v1/issues/${this.props.issue.id}`,{
                method: 'DELETE',
                headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                this.updateAllIssues(data)
            })
    }



    updateAllIssues = (data) => {
        let newIssuesList = this.props.issues.filter(issue => issue.id !== data.id)
        console.log('logging from inside updata all issues', newIssuesList)
        this.props.backButtonHandler()
    }

   

    render(){
        console.log('myass render', this.props)
        return(
            <div className ='IssueContainer'>
                <IssueNav 
                    addNewHandler={this.addNewHandler}
                    backButtonHandler={this.props.backButtonHandler}
                    cancelTicketHandler={this.cancelTicketHandler}        
                />

            <div className='SingleIssueContainer'>
                <div className='Title'>

                    <img src={logo} className="hardware logo" />
                    <div className= 'title'>
                    <h3>{this.props.issue.title}</h3>
                </div>
                <br/>
                     <div className='Category'>
                         <h3>Category: {this.props.issue.category} </h3>
                     </div>
                     <br/>
                 <div className="Description">
                        <h3>Description : {this.props.issue.description} </h3>
                    </div>
               </div>
                <div className='single issue'>
                {this.state.add ? <AddNewAssignment addNewHandler={this.addNewHandler} /> : null}
                <h3> History </h3>
                {this.renderAssignments()}
            </div>
        </div>
    </div>
  
  

        )
    }
}

const mapStateToProps = (state) =>{
    return state
}
export default connect(mapStateToProps, { allIssues })(SingleIssue)
