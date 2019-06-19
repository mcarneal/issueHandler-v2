import React, { Component } from 'react'
import { connect } from 'react-redux'
import logo from '../co.png'
class EmployeeCard extends Component{


    render(){
        return(
                <div className='employee container'>
                    <div className='employee card'>
                        <div className='welcome banner'>
                            <div>
                                <br/>
                                <h1>Welcome to IssueHandlr</h1>
                            </div>
                            <div>
                                <h4>There are currently:</h4>
                            </div>
                            <div>
                                <h4>{this.props.issues.length} tickets checked in.</h4>
                        </div>
                    </div>
                        <div className='employee card logo'>
                        <img src={logo} alt='logo' className="card logo" />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state 
}
export default connect(mapStateToProps)(EmployeeCard)
