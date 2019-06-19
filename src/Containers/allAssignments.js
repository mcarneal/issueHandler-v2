import React, { Component } from 'react'
import { connect } from 'react-redux'
import { statusChanged } from '../actions'

class AllAssignments extends Component{


    state = {
        completed : this.props.completed,
        employee : ''
    } 
   

    changeHandler = () => {
        let completed = this.props.completed
        this.setState({completed : !this.state.completed})
        this.props.changeStatusHandler(this.props.id , !completed)
    }

   


    renderStatus = () => {
        if(this.state.completed){
            return(
                <div className ='AssignmentComplete'>
                    <h3> Status : Complete</h3>
                </div>
            )
        } else {
            return(
                <div className = 'AssignmentIncomplete'>
                    <h3> Status : Incomplete </h3>
            </div>
            )
        }
    }

    findEmployee = () => {
        if(this.props.employees.length > 0){
            let employee = this.props.employees.find(employeeObj => employeeObj.id === this.props.employee_id)
            return employee.name

        }
    }
    
    render(){
        return(
            <div className= "AssignmentCard">
                <div className='Assignment Details'>
                <h4>{this.props.title}</h4>
                <h4>Description : {this.props.description}</h4>
                <h4>Assigned to : {this.findEmployee()}</h4>
            </div>
            <div className='Assignment Status'>
                {this.renderStatus()} 
                <button className="ChangeStatus" onClick={this.changeHandler}>Change Status</button>
                <br></br>
            </div>
    </div>
        )
    }
}


const mapStateToProps = (state) => {
    return state 
}

export default connect(mapStateToProps, {statusChanged})(AllAssignments) 
