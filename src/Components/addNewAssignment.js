import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectedIssue } from '../actions'
import { allIssues } from '../actions'
import { storeMyAssignments } from '../actions'
import { Form, Input, TextArea, Button, Select } from 'semantic-ui-react'

class AddNewAssignment extends Component{

    state = {
        title : '',
        description : '',
        Employee : '',
        EmployeeId : null 
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        }) 
    }

    onAddSubmit = (e) => {
        console.log(this.state)
     
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
            employee_id: this.state.EmployeeId
        }
      })
    }).then(res => res.json())
            .then(data => {
                if (data.error){
                    alert("Invalid Entry")
                } else {
                this.updateIssue(data)
                this.updateAssignments(data)
                this.props.addNewHandler()                
                }
            })
    }

    updateIssue = (data) => {
        let updatedIssue = this.props.issue
        updatedIssue.assignments.push(data)
        let filteredIssues = this.props.issues.filter(issue => issue.id !== updatedIssue.id)
        let updatedIssues = [...filteredIssues, updatedIssue]
        this.props.allIssues(updatedIssues)
        this.props.selectedIssue(updatedIssue)
        
    }

    updateAssignments = (data) => {
        let newAssignmentsArray = [...this.props.myAssignments, data]
        this.props.storeMyAssignments(newAssignmentsArray)
    }

    listEmployees = () => {
        let employeeList = []
        this.props.employees.map((employee) =>{
            let obj = {text : employee.name , value : employee.name, id : employee.id}
            employeeList.push(obj)
        })
        console.log('logs of employee', employeeList)
        return employeeList
    }


    categoryChangeHandler = (e) => {
        console.log('eeeeeee', e.target.id)
        this.setState({EmployeeId : parseInt(e.target.id)})
    }

    render(){
        let options = this.listEmployees()
        return(
            <div className='New Assignment Form'>
                <br/><br/>
                <Form>
                        <Form.Field
                            id='form-input-control-issue-title'
                            control={Input}
                            label='Issue Title'
                            placeholder='Title'
                            name='title'
                           
                            onChange={this.onChangeHandler}
                            />

                    <Form.Field
                        id='form-textarea-control-description'
                        control={TextArea}
                        label='Description'
                        placeholder='Description'
                        name='description'
                        value={this.state.description}
                        onChange={this.onChangeHandler}
                        />
                        <Form.Field
                            control={Select}
                            options={options}
                            label={{ children: 'Employees', htmlFor: 'form-select-control-category' }}
                            placeholder='Assign Employee'
                            search
                            searchInput={{ id: 'form-select-control-employees' }}
                            name='employees' 
                            onChange={this.categoryChangeHandler}
                            />
                    <Form.Field
                        onClick={this.onAddSubmit}
                        id='form-button-control-public'
                        control={Button}
                        content='Confirm'
                        label='Create New Issue'
                         />
                    <Form.Field
                        onClick={this.props.addNewHandler}
                        id='form-button-control-public'
                        control={Button}
                        content='Cancel'
                    />
                        </Form>
                        <br/>
            </div>


        )
    }
}


const mapStateToProps = (state) =>{
    return state 
}

export default connect(mapStateToProps, { selectedIssue, allIssues, storeMyAssignments })(AddNewAssignment)

