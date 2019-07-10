import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'; // allows components to call action creators
import * as actions from './actions/index'; // import all action creators
import './App.css';
//import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import About from './components/About';
import NavBar from './components/NavBar';
import ArtistPage from './components/ArtistPage';
import AlbumPage from './components/AlbumPage';
import TrackPage from './components/TrackPage';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser(); // in the future declare as type
  }

  render() {
    return (
      <Fragment>
        <NavBar />
        <main className="container-fluid">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/me" component={About} />
              <Route path="/artist/:id" component={ArtistPage} />
              <Route path="/album/:id" component={AlbumPage} />
              <Route path="/track/:id" component={TrackPage} />
              <Redirect to="/" />
            </Switch>
          </BrowserRouter>
        </main>
      </Fragment>
    );
  }
}

export default connect(
  null, // what the component is actively listening to
  actions // what the component can change in the store variable via actions/dispatch
)(App);
