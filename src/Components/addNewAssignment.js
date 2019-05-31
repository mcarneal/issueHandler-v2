import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectedIssue } from '../actions'
import { Form, Input, TextArea, Button, Select } from 'semantic-ui-react'

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
                        onClick={this.onAddSubmit}
                        id='form-button-control-public'
                        control={Button}
                        content='Confirm'
                        label='Create New Issue'
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

export default connect(mapStateToProps, { selectedIssue })(AddNewAssignment)

