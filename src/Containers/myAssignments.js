import React , { Component } from 'react'
import { connect } from 'react-redux'
import AssignmentCard from "../Components/assignmentsCard"
import { storeMyAssignments } from '../actions'

class MyAssignments extends Component {


    state = {
        myAssignments : null
    }



    findMyAssignment = () => {
        if(this.props.myAssignments){
            return this.props.myAssignments.filter(assignment => assignment.employee_id === this.props.user.id)
        }
    }

    renderMyAssignments = () => {
        if(this.props.myAssignments.length > 0){
            let myAssignmentsArray = this.findMyAssignment()
            let sortedArray = myAssignmentsArray.sort(function(a, b){return b.id - a.id})

            return sortedArray.map(assignment => <AssignmentCard clickHandler={this.props.clickHandler} key={assignment.id} {...assignment}/> )
        }
    } 

    render(){
        return(
            <div className='My Assignments Container'>
                {this.renderMyAssignments()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state
} 

export default connect(mapStateToProps, { storeMyAssignments })(MyAssignments) 
