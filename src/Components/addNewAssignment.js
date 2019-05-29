import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectedIssue } from '../actions'

class AddNewAssignment extends Component{

    state = {
        title : '',
        description : ''
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        }) 
    }

    onAddSubmit = (e) => {
     
    fetch('http://localhost:3000/api/v1/assignments',{
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        assignment: {
          title: this.state.title,
          description: this.state.description,
            issue_id: this.props.issue.id,
            employee_id: this.props.user.id
        }
      })
    }).then(res => res.json())
            .then(data => {
                this.updateIssue(data)
                this.props.addNewHandler()
            })
    }

    updateIssue = (data) => {
        console.log('inside update issue', data)
        let updatedIssue = this.props.issue
        updatedIssue.assignments.push(data)
        this.props.selectedIssue(updatedIssue)
        
    }

    render(){
        return(
            <div>
                <form>
                    <input type='text' name='title' value={this.state.title} onChange={this.onChangeHandler} />
                    <input type='text' name='description' value ={this.state.description} onChange={this.onChangeHandler}/>
            </form>
                    <button onClick={(e)=> this.onAddSubmit(e)}>submit</button>

            </div>


        )
    }
}


const mapStateToProps = (state) =>{
    return state 
}

export default connect(mapStateToProps, { selectedIssue })(AddNewAssignment)

