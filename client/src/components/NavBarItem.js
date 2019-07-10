//------------------------------------------------------------------------------------------------
// The NavBarItem component implements the login button's functionality.
//------------------------------------------------------------------------------------------------
import React from 'react';
import { Link } from 'react-router-dom';
const NavBarItem = (props) => {
  let element;
  const containsAuth = props.link.includes('login') || props.link.includes('logout');

  if (props.link && !containsAuth) {
    element = (
      <li className="nav-item">
        <Link className="btn btn-dark" role="button" to={props.link}>
          {props.title}
        </Link>
      </li>
    );
  } else {
    element = (
      <li className="nav-item">
        <a className="btn btn-dark" role="button" href={props.link}>
          {props.title}
        </a>
      </li>
    );
  }

  return element;
};

export default NavBarItem;

//------------------------------------------------------------------------------------------------
// END NavBarItem component
//------------------------------------------------------------------------------------------------
