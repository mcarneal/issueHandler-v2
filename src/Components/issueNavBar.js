
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
    <Link className="item">
      Comment
    </Link>
    <Link className="item">
      Contact
    </Link>
    <Link className="item" onClick={props.changeStatusHandler}>
      Change Status
    </Link>
    <Link className="item">
      Add Assignment
    </Link>
    <Link className="item">
      Cancel Ticket
    </Link>
  </div>

  )
}

export default IssueBar;
