import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import defaultImage from '../assets/unknown.jpeg';
import './ArtistPage.css';

class AlbumPage extends React.Component {
  state = {
    displayName: '',
    imageURL: '',
    externalURL: '',
    artistId: '',
    tracks: []
  };

  componentDidMount() {
    //gets the album's id to display their homepage and information
    fetch(`http://localhost:8888/album/${this.props.match.params.id}`).then(
      (response) => {
        const body = response.json().then((parsedBody) => {
          let imageURL = parsedBody.images ? parsedBody.images[0].url : '';

          if (!imageURL) {
            imageURL = defaultImage;
          }

          this.setState({
            displayName: parsedBody.name,
            imageURL: imageURL,
            externalURL: parsedBody.external_urls.spotify,
            artistId: parsedBody.artists[0].id
          });
        });
      }
    );

    //gets the album's tracks to display via track-list
    fetch(`http://localhost:8888/album-tracks/${this.props.match.params.id}`).then(
      (response) => {
        const body = response.json().then((parsedBody) => {
          const trackCopy = parsedBody.items;
          this.setState({
            ...this.state,
            tracks: trackCopy
          });
        });
      }
    );
  }

  //converts ms to the format min:sec
  msToMinSecConversion = (duration_ms) => {
    var min = Math.floor(duration_ms / 60000);
    var sec = ((duration_ms % 60000) / 1000).toFixed(0);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  render() {
    const { displayName } = this.state;
    const { externalURL } = this.state;
    const { tracks } = this.state;
    const { artistId } = this.state;

    //creates an array of tracks and track information
    let trackArray = [];
    let artist = '';

    //REFACTOR THIS
    for (let i = 0; i < tracks.length; i++) {
      //initialize a tempArray to hold each track's info
      let tempArray = [];

      //get information from each track
      const { name } = tracks[i];
      const { duration_ms } = tracks[i];
      const duration = this.msToMinSecConversion(duration_ms);
      artist = tracks[i].artists[0].name;
      const artistLink = tracks[i].artists[0].external_urls.spotify;

      //links
      const albumLink = tracks[i].external_urls.spotify;
      const trackId = tracks[i].id;

      //push contents of track into the tempArray
      tempArray.push(i + 1); //pushes the number of the track/search number
      tempArray.push(name);
      tempArray.push(duration);

      //links necessary for redirection
      tempArray.push(trackId); //at track[3]

      //add this tracks info to the trackArray
      trackArray.push(tempArray);
    }

    //contains the elements to be rendered on the homepage
    let elements = (
      <Fragment>
        <div className="row">
          {/*Artist Info*/}
          <div className="col-6">
            <h3>{displayName} </h3>
            <img id="artistImg" src={this.state.imageURL} alt="" />
            <p>
              Artist: <Link to={'/artist/' + artistId}>{artist}</Link>
            </p>
            <p>
              <a href={externalURL} className="btn btn-light" target="_blank">
                Open {displayName} on Spotify
              </a>
            </p>
          </div>
          {/*Tracks*/}
          <div className="col-6">
            <h3>Album Tracks</h3>
            <table className="table table-sm table-light table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Track</th>
                  <th scope="col">Duration</th>
                </tr>
              </thead>
              <tbody>
                {trackArray.map((track, index) => {
                  //updates table on main search page
                  return (
                    <tr key={index}>
                      <td>{track[0]}</td>
                      <td>
                        <Link to={'/track/' + track[3]}>{track[1]}</Link>
                      </td>
                      <td>{track[2]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Fragment>
    );

    return <div className="app-artist">{elements}</div>;
  }
}

export default AlbumPage;
