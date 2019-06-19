import React, { Component } from 'react'
import { connect } from 'react-redux'
import IssueNav from '../Components/issueNavBar'
import AllAssignments from './allAssignments'
import { allIssues } from '../actions'
import AddNewAssignment from '../Components/addNewAssignment'
import logo from '../hardware.jpg'; // with import
import { storeMyAssignments } from '../actions'
import { withRouter } from 'react-router-dom'

class SingleIssue extends Component{

    state = {
        statusChanged : false,
        add : false,
        issue : {}
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
                this.updateIssue(data)
            })
    }


    updateIssue = (data) => {
        let filteredAssignments = [...this.props.myAssignments.filter(assignment => assignment.id !== data.id), data]
       this.props.storeMyAssignments(filteredAssignments) 
    }

    renderAssignments = () => {
    let sortedArray = this.props.myAssignments.sort(function(a, b){return b.id - a.id})

        return sortedArray.map(assignment => assignment.issue_id === this.props.issue.id ? <AllAssignments changeStatusHandler={this.changeStatusHandler} {...assignment}/> : null )
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
                this.props.history.push('/home')
            })
    }



    updateAllIssues = (data) => {
        let updatedAssignments = this.props.myAssignments.filter(assignment => assignment.issue_id !== data.id)
        this.props.storeMyAssignments(updatedAssignments)
        this.props.backButtonHandler()
    }

    componentDidMount(){
        this.setState({issue : this.props.selectedIssue})
    }
   

    render(){
        return(
            <div className ='IssueContainer'>
                <IssueNav 
                    addNewHandler={this.addNewHandler}
                    backButtonHandler={this.props.backButtonHandler}
                    cancelTicketHandler={this.cancelTicketHandler}        
                />

            <div className='SingleIssueContainer'>
                <div className='Title'>

                    <img src={logo} alt='logo' className="hardware logo" />
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
                {this.props.issue.assignments.length > 0 ? this.renderAssignments() : <h4>There are currently no assignments for this ticket</h4>}
            </div>
        </div>
    </div>
  
  

        )
    }
}

const mapStateToProps = (state) =>{
    return state
}
export default withRouter(connect(mapStateToProps, { allIssues, storeMyAssignments })(SingleIssue))
