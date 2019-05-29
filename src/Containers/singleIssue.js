import React, { Component } from 'react'
import { connect } from 'react-redux'
import IssueNav from '../Components/issueNavBar'
import AllAssignments from './allAssignments'
import { allIssues } from '../actions'
import AddNewAssignment from '../Components/addNewAssignment'


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
        let filteredAssignments = issue.assignments.filter(assignment => assignment.id !== data.id)
        let updatedAssignments = [...filteredAssignments, data]
        issue.assignments = updatedAssignments 
        let filteredIssueArray = this.props.issues.filter(issueObj => issueObj.id !== issue.id)
        let updatedIssueArray = [...filteredIssueArray, issue]
        console.log("updated issue array", updatedIssueArray, "old issue array", this.props.issues)
        this.props.allIssues(updatedIssueArray)
    }

    renderAssignments = () => {
        return this.props.issue.assignments.map(assignment => <AllAssignments changeStatusHandler={this.changeStatusHandler} {...assignment}/> )
    }

    addNewHandler = () => {
        this.setState({add: !this.state.add})
    }

   

    render(){
        console.log('myass render', this.props)
        return(
            <div className='IssuesContainer'>
                <IssueNav 
                    addNewHandler={this.addNewHandler}
                    backButtonHandler={this.props.backButtonHandler}/>
                <div className='Title'>
                    <h1>{this.props.issue.title}</h1>
                </div>
                <hr></hr>
                <div className="Description">
                    <h2>Description <br/>{this.props.issue.description} </h2>
                </div>
                <hr></hr>
                <h2>Category: {this.props.issue.category} </h2>
                <h3> History </h3>
                {this.renderAssignments()}
                {this.state.add ? <AddNewAssignment addNewHandler={this.addNewHandler} /> : null}
    </div>
  

        )
    }
}

const mapStateToProps = (state) =>{
    return state
}
export default connect(mapStateToProps, { allIssues })(SingleIssue)
