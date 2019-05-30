import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Input, TextArea, Button, Select } from 'semantic-ui-react'
import { allIssues } from '../actions'



class NewContainer extends Component{

    state = {
        title : '',
        description : '',
        category : ''
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value 
        })
    }

    categoryChangeHandler = (e) => {
        this.setState({category : e.target.innerText})
    }

    submitNewIssue = () => {
        console.log('from inside new issue', this.state)
        fetch('http://localhost:3000/api/v1/issues',{
            method: 'POST',
            headers: {
            "Content-Type": "application/json"
        },
      body: JSON.stringify({
        issue: {
            title: this.state.title,
            description: this.state.description,
            category: this.state.category
        }
      })
        }).then(res => res.json())
            .then(data => {
                this.props.submitViewHandler(data)
            })
    }

    render(){
        const categoryOptions = [
            { key: 'h', text: 'Hardware', value: 'hardware' },
            { key: 's', text: 'Software', value: 'software' },
            { key: 'o', text: 'Other', value: 'other' },
        ]

        return(
            <div className='NewContainer'>
                  <Form>
                    <Form.Group widths='equal'>
                        <Form.Field
                            id='form-input-control-issue-title'
                            control={Input}
                            label='Issue Title'
                            placeholder='Title'
                            name='title'
                           
                            onChange={this.changeHandler}
                            />
                        <Form.Field
                            control={Select}
                            options={categoryOptions} 
                            label={{ children: 'Categroy', htmlFor: 'form-select-control-category' }}
                            placeholder='Category'
                            search
                            searchInput={{ id: 'form-select-control-Category' }}
                            name='category'
     
                            onChange={this.categoryChangeHandler}
                            />
                    </Form.Group>
                    <Form.Field
                        id='form-textarea-control-description'
                        control={TextArea}
                        label='Description'
                        placeholder='Description'
                        name='description'
                        value={this.state.description}
                        onChange={this.changeHandler}
                        />
                    <Form.Field
                        onClick={this.submitNewIssue}
                        id='form-button-control-public'
                        control={Button}
                        content='Confirm'
                        label='Create New Issue'
                         />
                    </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, { allIssues })(NewContainer)
