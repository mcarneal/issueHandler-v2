import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import IssuesContainer from './issuesContainer' 
class Home extends React.Component {


    state = {
        showAll : true
    }

    renderContent = () => {
        if (this.props.user.username){
            if (this.state.showAll){
                return <IssuesContainer />              
            } else if (!this.state.showAll){
                return <h1>One page</h1>
            }
        } else {
            return <h1>Loading</h1>
        }
    }

    clickHandler = (e) =>{
        e.preventDefault()
        this.setState({showAll : !this.state.showAll})
    }
    render(){
        console.log(this.state.showAll)
        return(
            <div>
                {this.renderContent()}
                <button onClick={this.clickHandler}>click me</button>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return state
}
export default withRouter(connect(mapStateToProps)(Home))
