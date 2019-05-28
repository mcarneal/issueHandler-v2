import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import IssuesContainer from './issuesContainer' 
import MyAssignments from './myAssignments'
import { selectedIssue } from '../actions'
import SingleIssue from './singleIssue'
import NavBar from '../Components/navbar'



class Home extends React.Component {

    state = {
        showAll : true
    }

    renderContent = () => {
        if (this.props.user.username){
            if (this.state.showAll){
                return (
                    <div>
                        <NavBar />
                        <div className ='home'>
                            <MyAssignments />
                            <IssuesContainer clickHandler={this.clickHandler} />
                        </div>
                    </div>
                )             
            } else if (!this.state.showAll){
                return(
                    <div>
                        <NavBar />
                            <div className ='home'>
                                <MyAssignments />
                                <SingleIssue backButtonHandler={this.backButtonHandler} />
                            </div>
                        </div>
                )             
               
            }
        } else {
            return <h1>Loading</h1>
        }
    }


    clickHandler = (props) => {
        this.props.selectedIssue(props)
        this.setState({showAll : !this.state.showAll})
    }

    backButtonHandler = () =>{
        this.setState({showAll : !this.state.showAll})
    }



    
    render(){
        return(
            <div>
                {this.renderContent()}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return state
}
export default withRouter(connect(mapStateToProps, { selectedIssue })(Home))
