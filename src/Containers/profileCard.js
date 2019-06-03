import React, { Component } from 'react'
import profile from '../profile.png'; // with import
import { connect } from 'react-redux'

class ProfileCard extends Component{

    state = {
        myAssignments : []
    }


    findMyAssignments = () => {
        if(this.props.myAssignments.length > 0)
        return this.props.myAssignments.filter(assignment => assignment.employee_id === this.props.user.id).length
    } 

    render(){
        let myAssignments = this.findMyAssignments()
        console.log(myAssignments)
        return(
                <div className='test2'>
                    <div className='profile card'>
                        <img src={profile} className="profile pic" />
                    <div>
                        <h4>{this.props.user.username}</h4>
                    </div>
                    <div>
                        <h4>
                           You have {this.findMyAssignments()} assignments 
                            
                    </h4>
                    </div>

                    </div>
                </div>
        )
    }
}
const mapStateToProps = (state) => {
    return state
}
export default connect(mapStateToProps)(ProfileCard) 
