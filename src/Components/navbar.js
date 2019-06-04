
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
  return (
    <div className="ui inverted segment">
      <div className="ui inverted pointing secondary menu">
          <button onClick={props.homeButtonHandler} to="/home" className="item">
          Home
          </button>
          <Link to="/" onClick={props.logoutHandler} className="item" id='logout'>
          LogOut
          </Link>
          <button className="item" onClick={props.menuClickHandler}>
              Add New
          </button>
        </div>
      </div>

  )
}




export default NavBar;
