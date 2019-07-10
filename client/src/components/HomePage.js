//------------------------------------------------------------------------------------------------
// The HomePage component contains the basic skeleton of our Spotify homepage.
//------------------------------------------------------------------------------------------------
import React, { Component } from 'react';
import About from './About';
import Search from './Search';

export default class MainPage extends Component {
  render() {
    return (
      <div className="row">
        <About />
        <Search />
      </div>
    );
  }
}

//------------------------------------------------------------------------------------------------
// End HomePage component
//------------------------------------------------------------------------------------------------
