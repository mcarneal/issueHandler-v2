
import React from 'react';
import { Link } from 'react-router-dom';

const IssueBar = (props) => {
  return (
    <div class="ui menu">
    <Link className="item" onClick={props.backButtonHandler}>
      <button className="ui red button">
      Back
    </button>
    </Link>
    <Link className="item" onClick={props.addNewHandler}>
      Add Assignment
    </Link>
    <Link className="item" onClick={props.cancelTicketHandler}>
      Close Ticket
    </Link>
  </div>

  )
}

export default IssueBar;
