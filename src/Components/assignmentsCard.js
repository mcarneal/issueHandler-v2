import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import { connect } from 'react-redux'

class AssignmentCard extends Component {



    assignmentClickHandler = () => {
        let issue = this.props.issues.find(issue => issue.id === this.props.issue_id)
        this.props.clickHandler(issue)
    }

    render(){
        return(
            <Card onClick={this.assignmentClickHandler}>
                <Card.Content header={this.props.title} />
                 <Card.Content description={this.props.description} />
               
            </Card>
        )
    }
}
const mapStateToProps = (state) =>{
    return state
}
export default connect(mapStateToProps)(AssignmentCard) 
