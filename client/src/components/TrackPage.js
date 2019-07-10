//------------------------------------------------------------------------------------------------
// The TrackPage contains all information about tracks.
//------------------------------------------------------------------------------------------------
import React from 'react';
import Thermometer from './Thermometer';
import './TrackPage.css';
import { Link } from 'react-router-dom';

export default class TrackPage extends React.Component {
  constructor(props) {
    super(props);
    const trackId = this.props.match.params.id;
    this.state = {
      trackId: trackId
    };
  }

  componentDidMount() {
    //gets the album's id to display their homepage and information
    fetch(`http://localhost:8888/track/${this.props.match.params.id}`).then(
      (response) => {
        const body = response.json().then((parsedBody) => {
          this.setState({
            ...this.state,
            trackId: this.props.match.params.id,
            trackName: parsedBody.name,
            artistName: parsedBody.artists[0].name,
            duration: parsedBody.duration_ms,
            albumName: parsedBody.album.name,
            songLink: parsedBody.external_urls.spotify,
            artistId: parsedBody.artists[0].id,
            albumId: parsedBody.album.id
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
    let durationConverted = this.msToMinSecConversion(this.state.duration);
    const { songLink } = this.state;
    const { albumId } = this.state;
    const { artistId } = this.state;
    const { trackId } = this.state;

    return (
      <div className="row">
        <div className="col-6">
          <h1>{this.state.trackName}</h1>
          <p>
            Track on{' '}
            <Link to={'/album/' + albumId} className="trackInfo">
              {this.state.albumName}
            </Link>
          </p>
          <div>
            <p>
              Artist:{' '}
              <Link to={'/artist/' + artistId} className="trackInfo">
                {this.state.artistName}
              </Link>
            </p>
          </div>
          <p>Duration: {durationConverted}</p>
          <p>
            <a
              href={songLink}
              className="btn btn-light trackRedirectLink"
              role="button"
              target="_blank"
            >
              Open {this.state.trackName} on Spotify
            </a>
          </p>
        </div>
        <div className="col-6">
          <Thermometer id={trackId} />
        </div>
      </div>
    );
  }
}

//------------------------------------------------------------------------------------------------
// END TrackPage component
//------------------------------------------------------------------------------------------------
