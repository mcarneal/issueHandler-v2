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

    findAssignmentEmployee = () => {
       return this.props.issue.employees.find(employee => employee.id === this.props.employee_id)
    }

    componentDidUpdate(prevProps){
        console.log('prevProps', prevProps)
        console.log('current', this.props)
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
    
    render(){
        const employee = this.findAssignmentEmployee() 
        return(
            <div className= "AssignmentCard">
                <div className='Assignment Details'>
                <h4>{this.props.title}</h4>
                <h4>Description : {this.props.description}</h4>
                {this.props.employee_id ? <h4>Assigned to:{employee.name}</h4> : <h4>Assigned to:{this.props.employee_name}</h4>}
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
