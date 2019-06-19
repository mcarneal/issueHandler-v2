import React, { Component } from 'react'
import { connect } from 'react-redux'
import { allIssues } from '../actions' 
import { Table } from 'semantic-ui-react'
import IssueCard from '../Components/issueCard'

class IssuesContainer extends Component{


    componentDidMount(){
        fetch('http://localhost:3000/api/v1/issues')
            .then(res => res.json())
            .then(data =>{
                this.props.allIssues(data)
            })
    }

    renderIssues = () =>{
        if(this.props.issues.length > 0){
            let issues = this.props.issues
           return issues.map(issue => <IssueCard key={issue.id} {...issue} clickHandler={this.props.clickHandler} />)    
        }
    }

    render(){
        return(
            <div className='IssuesContainer'>
                 <Table celled selectable>
                    <Table.Header>
                        <Table.Row className='table rows'>
                            <Table.HeaderCell>Title</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Category</Table.HeaderCell>
                            <Table.HeaderCell>Number of assignments</Table.HeaderCell>
                            <Table.HeaderCell>Percent to completion</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                   {this.renderIssues()}
                </Table>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, { allIssues })(IssuesContainer)
