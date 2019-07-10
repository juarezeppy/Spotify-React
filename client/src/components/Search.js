//------------------------------------------------------------------------------------------------
// The Search component contains a search form that takes in 1) typed user input (what they are
// searching for), 2) the input type (artist/album/track), and 3) a button that submits this
// information and calls on the correct component to display (carousel or track-list).
//------------------------------------------------------------------------------------------------
import React, { Component } from 'react';
import './Search.css';
import Carousel from './Carousel';
import TrackList from './TrackList';

class Search extends Component {
  //constructor and state variables
  state = {
    inputValue: '',
    optionValue: 'artist',
    submit: false,
    searchResults: []
  };

  //sets the value of inputValue to be used upon submit
  handleInput = (event) => {
    this.setState({ ...this.state, inputValue: event.target.value });
  };

  //sets the value of optionValue to be used upon submit
  handleOption = (event) => {
    this.setState({ ...this.state, optionValue: event.target.value });
  };

  //submits search results to the Spotify server and stores them in searchResults
  handleSubmit = async (event) => {
    event.preventDefault();
    console.log('event :', event);
    const response = await fetch(
      `http://localhost:8888/search/${this.state.optionValue}/${this.state.inputValue}` //inputValue --> spotifyId
    );
    const body = await response.json();
    console.log('getting data :', body);
    this.setState({
      ...this.state,
      searchResults: body,
      submit: true,
      componentType: this.state.optionValue
    });
  };

  render() {
    const { submit } = this.state;
    const { optionValue } = this.state;
    const { componentType } = this.state;

    //prevents the state from being changed dynamically with every change to the form
    if (this.state.submit === true) {
      this.setState({ submit: false });
    }

    // console.log('componentType :', componentType);
    const renderCarousel =
      optionValue === 'artist' || optionValue === 'album' ? true : false;

    let searchResultElement = null;

    //chooses correct component to render
    if (componentType === 'artist' || componentType === 'album')
      searchResultElement = <Carousel payload={this.state.searchResults} />;
    else if (componentType === 'track')
      searchResultElement = <TrackList payload={this.state.searchResults} />;

    return (
      <div className="col-6">
        <h3>Search Spotify</h3>
        <div className="row">
          <form onSubmit={this.handleSubmit}>
            <span>
              <input
                type="text"
                placeholder="Search for Spotify Stuff"
                value={this.state.inputValue}
                onChange={this.handleInput}
              />
            </span>
            <select value={this.state.value} onChange={this.handleOption}>
              <option value="artist">artist</option>
              <option value="track">track</option>
              <option value="album">album</option>
            </select>
            <button className="btn btn-light" type="submit" value="Submit">
              Search
            </button>
          </form>
        </div>
        {searchResultElement}
      </div>
    );
  }
}

export default Search;

//------------------------------------------------------------------------------------------------
// END Search component
//------------------------------------------------------------------------------------------------
