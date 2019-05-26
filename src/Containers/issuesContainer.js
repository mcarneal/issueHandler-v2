import React, { Component } from 'react'
import { connect } from 'react-redux'
import { allIssues } from '../actions' 

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
            console.log(issues)
            return issues.map(issue => <p>{issue.description}</p>)        
        }
    }

    render(){
        console.log('inside ic render', this.props)
        return(
            <div>
                <h1>Issues container</h1>
                {this.renderIssues()}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, { allIssues })(IssuesContainer)
