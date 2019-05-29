import React, { Component } from 'react'
import { connect } from 'react-redux'
import { statusChanged } from '../actions'

class AllAssignments extends Component{


    state = {
        completed : this.props.completed
    } 
   

    changeHandler = () => {
        let completed = this.props.completed
        this.setState({completed : !this.state.completed})
        this.props.changeStatusHandler(this.props.id , !completed)
    }

    render(){
        console.log('looking for change in props', this.props.completed)
        return(
            <div>
                <h3>{this.props.title}</h3>
                <h4>{this.props.description}</h4>
                <button onClick={this.changeHandler}>click me</button>
                <br></br>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return state 
}

export default connect(mapStateToProps, {statusChanged})(AllAssignments) 
