import React, { Component } from 'react'
import { connect } from 'react-redux'
import IssueNav from '../Components/issueNavBar'

class SingleIssue extends Component{



    render(){
        return(
            <div className='IssuesContainer'>
                <IssueNav backButtonHandler={this.props.backButtonHandler}/>
                <h1>{this.props.issue.title}</h1>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return state
}
export default connect(mapStateToProps)(SingleIssue)
