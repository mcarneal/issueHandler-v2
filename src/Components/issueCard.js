import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'


class IssueCard extends Component{
  
    render(){
      let completedAssignments = this.props.assignments.length > 0 ?  this.props.assignments.filter((assignment) => {
      return assignment.completed === true
    }).length : 0

    let checkStatus = completedAssignments * 100 /this.props.assignments.length
    let status = checkStatus >= 0 ? checkStatus : 0

        return (
           
            <Table.Body>
                <Table.Row onClick={ ()=>this.props.clickHandler(this.props)}>
                    <Table.Cell>{this.props.title}</Table.Cell>
                    <Table.Cell>{this.props.description}</Table.Cell>
                    <Table.Cell textAlign='right'>{status} %</Table.Cell>
                </Table.Row>
            </Table.Body>
        
        )
    }
}

export default IssueCard
