import React , { Component } from 'react'
import { connect } from 'react-redux'
import AssignmentCard from "../Components/assignmentsCard"


class MyAssignments extends Component {


    state = {
        myAssignments : null
    }



    renderMyAssignment = () => {
        if(this.state.myAssignments){
            console.log('inside condtional', this.state.myAssignments)
            return this.state.myAssignments.map(assignment => <AssignmentCard key={assignment.id} {...assignment} />)
        }
    }

    componentWillReceiveProps(nextProps){
        let myAssignments = []
        console.log('cwrp', nextProps)
        nextProps.issues.forEach((issue) =>{
            issue.assignments.forEach((assignment) =>{
                return assignment.employee_id === this.props.user.id ? myAssignments.push(assignment) : null
            })
        })
       this.setState({myAssignments})
    }

    render(){
        console.log('inside my assignments', this.state)
        return(
            <div className='My Assignments Container'>
                {this.renderMyAssignment()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state
} 

export default connect(mapStateToProps)(MyAssignments) 
