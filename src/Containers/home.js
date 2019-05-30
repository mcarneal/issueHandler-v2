import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import IssuesContainer from './issuesContainer' 
import MyAssignments from './myAssignments'
import { selectedIssue } from '../actions'
import SingleIssue from './singleIssue'
import NavBar from '../Components/navbar'
import NewIssue from './newIssue'


class Home extends React.Component {

    state = {
        showAll : true,
        newIssue : false
    }


    renderContent = () => {
        if (this.props.user.username){
            if (this.state.showAll){
                return (
                    <div>
                        <div className ='home'>
                            <MyAssignments clickHandler={this.clickHandler} />
                            <IssuesContainer clickHandler={this.clickHandler} />
                        </div>
                    </div>
                )             
            } else if (!this.state.showAll && !this.state.newIssue){
                return(
                    <div>
                            <div className ='home'>
                                <MyAssignments clickHandler={this.clickHandler} />
                                <SingleIssue backButtonHandler={this.backButtonHandler}
                                             changeStatusHandler={this.changeStatusHandler}/>
                            </div>
                        </div>
                )             
               
            }
         else if (this.state.newIssue) {
            return (
                <div>
                    <div className="home">
                        <MyAssignments clickHandler={this.clickHandler} />
                        <NewIssue submitViewHandler={this.clickHandler} />
                    </div>
            </div>
            )
        }
        
        }else {
            return <h1>Loading</h1>
        }
    }

    menuClickHandler = () => {
        console.log("im clicking from the menu", this.state.newIssue)
        this.setState ({newIssue : true})
        this.setState ({showAll : false})
    }


    clickHandler = (props) => {
        this.props.selectedIssue(props)
        this.setState({showAll : false})
        this.setState({newIssue : false})
    }

    backButtonHandler = () =>{
        this.setState({showAll : true})
    }




    
    render(){
        return(
            <div>
                <NavBar menuClickHandler={this.menuClickHandler}/>

                {this.renderContent()}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return state
}
export default withRouter(connect(mapStateToProps, { selectedIssue })(Home))
