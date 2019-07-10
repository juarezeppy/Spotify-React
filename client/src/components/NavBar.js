//------------------------------------------------------------------------------------------------
// The NavBar component contains the brand and login button that redirects the user to the
// spotify login page for authentication.
// ***Logout is not yet implemented.****
//------------------------------------------------------------------------------------------------
import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBarItem from './NavBarItem';

class NavBar extends Component {
  render() {
    const { auth } = this.props;

    let loginHandlerTitle;
    let loginHandlerLink;

    if (auth) {
      loginHandlerTitle = 'Logout';
      loginHandlerLink = 'http://localhost:8888/api/logout'; // <--- not sure if this applies to us
    } else if (auth === false) {
      loginHandlerTitle = 'App Login';
      loginHandlerLink = 'http://localhost:8888/login';
    } else {
    }

    return (
      <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-light">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item navbar-brand">
            <a className="navbar-brand" href="/">
              Browsing Spotify
            </a>
          </li>
        </ul>
        <ul className="navbar-nav navbar-right mr-auto">
          {auth !== null && (
            <NavBarItem title={loginHandlerTitle} link={loginHandlerLink} />
          )}
        </ul>
      </nav>
    );
  }
}

// this allows NavBar to "listen" to state values and react to auth
function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(NavBar);

//------------------------------------------------------------------------------------------------
// END NavBar component
//------------------------------------------------------------------------------------------------
