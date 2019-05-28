import React, { Component } from 'react'
import { Card, Icon } from 'semantic-ui-react'

class AssignmentCard extends Component {




    render(){
        return(
            <Card>
                <Card.Content header={this.props.title} />
                 <Card.Content description={this.props.description} />
               
            </Card>
        )
    }
}

export default AssignmentCard 
