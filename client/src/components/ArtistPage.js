import React, { Fragment } from 'react';
import defaultImage from '../assets/unknown.jpeg';
import './ArtistPage.css';
import Carousel from './Carousel';
import { Link } from 'react-router-dom';

class ArtistPage extends React.Component {
  state = {
    displayName: '',
    imageURL: '',
    externalURL: '',
    genres: [],
    tracks: [],
    albums: [],
    similarArtists: []
  };

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceive Props :', this.props);
    if (nextProps.match.params.id !== this.props.match.params.id) {
      // console.log('componentWillReceive nextProps :', nextProps);

      this.setState({});

      //getes the artist's id to display their homepage and information
      fetch(`http://localhost:8888/artist/${nextProps.match.params.id}`).then(
        (response) => {
          const body = response.json().then((parsedBody) => {
            let imageURL = parsedBody.images ? parsedBody.images[0].url : '';
            const { genres } = parsedBody;

            if (!imageURL) {
              imageURL = defaultImage;
            }

            this.setState({
              displayName: parsedBody.name,
              imageURL: imageURL,
              externalURL: parsedBody.external_urls.spotify,
              genres: genres
            });
          });
        }
      );

      //gets the artist's top tracks to display via track-list
      fetch(`http://localhost:8888/artist-top-tracks/${nextProps.match.params.id}`).then(
        (response) => {
          const body = response.json().then((parsedBody) => {
            const trackCopy = parsedBody.tracks.concat();
            this.setState({
              ...this.state,
              tracks: trackCopy
            });
          });
        }
      );

      //gets the artists albums to put into a carousel
      fetch(`http://localhost:8888/artist-albums/${nextProps.match.params.id}`).then(
        (response) => {
          const body = response.json().then((parsedBody) => {
            this.setState({
              ...this.state,
              albums: parsedBody.items
            });
          });
        }
      );

      //gets the related artist to put into a carousel
      fetch(
        `http://localhost:8888/artist-related-artists/${nextProps.match.params.id}`
      ).then((response) => {
        const body = response.json().then((parsedBody) => {
          this.setState({
            ...this.state,
            similarArtists: parsedBody.artists
          });
        });
      });
    }
  }

  componentDidMount() {
    // console.log('componentDidMount :');
    //getes the artist's id to display their homepage and information
    fetch(`http://localhost:8888/artist/${this.props.match.params.id}`).then(
      (response) => {
        const body = response.json().then((parsedBody) => {
          let imageURL = parsedBody.images ? parsedBody.images[0].url : '';
          const { genres } = parsedBody;

          if (!imageURL) {
            imageURL = defaultImage;
          }

          this.setState({
            displayName: parsedBody.name,
            imageURL: imageURL,
            externalURL: parsedBody.external_urls.spotify,
            genres: genres
          });
        });
      }
    );

    //gets the artist's top tracks to display via track-list
    fetch(`http://localhost:8888/artist-top-tracks/${this.props.match.params.id}`).then(
      (response) => {
        const body = response.json().then((parsedBody) => {
          const trackCopy = parsedBody.tracks.concat();
          this.setState({
            ...this.state,
            tracks: trackCopy
          });
        });
      }
    );

    //gets the artists albums to put into a carousel
    fetch(`http://localhost:8888/artist-albums/${this.props.match.params.id}`).then(
      (response) => {
        const body = response.json().then((parsedBody) => {
          this.setState({
            ...this.state,
            albums: parsedBody.items
          });
        });
      }
    );

    //gets the related artist to put into a carousel
    fetch(
      `http://localhost:8888/artist-related-artists/${this.props.match.params.id}`
    ).then((response) => {
      const body = response.json().then((parsedBody) => {
        this.setState({
          ...this.state,
          similarArtists: parsedBody.artists
        });
      });
    });
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
    const { genres } = this.state;
    const { tracks } = this.state;

    let genresElements = null;
    genresElements = genres.map((genre) => {
      return <li key={genre}>{genre}</li>;
    });

    //creates an array of tracks and track information
    let trackArray = [];

    //REFACTOR THIS
    for (let i = 0; i < tracks.length; i++) {
      //initialize a tempArray to hold each track's info
      let tempArray = [];

      //get information from each track
      const { name } = tracks[i];
      const { duration_ms } = tracks[i];
      const duration = this.msToMinSecConversion(duration_ms);
      const artist = tracks[i].artists[0].name;
      const artistLink = tracks[i].artists[0].id;

      //links
      const album = tracks[i].album.name;
      const albumLink = tracks[i].album.id;
      const trackId = tracks[i].id;

      //push contents of track into the tempArray
      tempArray.push(i + 1); //pushes the number of the track/search number
      tempArray.push(name);
      tempArray.push(duration);
      tempArray.push(artist);
      tempArray.push(album);

      tempArray.push(trackId); //at track[5]
      tempArray.push(artistLink); //at track[6]
      tempArray.push(albumLink); //at track[7]

      //add this tracks info to the trackArray
      trackArray.push(tempArray);
    }

    const payload = {
      albums: {
        items: this.state.albums
      }
    };

    const similarArtistsPayload = {
      artists: {
        items: this.state.similarArtists
      }
    };

    //contains the elements to be rendered on the homepage
    let elements = (
      <Fragment>
        <div className="row">
          {/*Artist Info*/}
          <div className="col-6">
            <h3>{displayName} </h3>
            <img id="artistImg" src={this.state.imageURL} alt="" />
            <p>
              <a href={externalURL} className="btn btn-light" target="_blank">
                Open {displayName} on Spotify
              </a>
            </p>
          </div>
          {/*Genres and tracks*/}
          <div className="col-2">
            <h3>Genres</h3>
            <ul>{genresElements}</ul>
            <p />
          </div>
          <div className="col-4">
            <h3>{displayName}'s Top Tracks</h3>
            <table className="table table-sm table-light table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Track</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Artist</th>
                  <th scope="col"> Album</th>
                </tr>
              </thead>
              <tbody>
                {trackArray.map((track, index) => {
                  //updates table on main search page
                  return (
                    <tr key={index}>
                      {/* Track number*/}
                      <td>{track[0]}</td>
                      <td>
                        {/* Track name*/}
                        <Link to={'/track/' + track[5]}>{track[1]}</Link>
                      </td>
                      {/* Duration */}
                      <td>{track[2]}</td>
                      <td>
                        {/* Artist*/}
                        <Link to={'/artist/' + track[6]}>{track[3]}</Link>
                      </td>
                      <td>
                        {/* Album*/}
                        <Link to={'/album/' + track[7]}>{track[4]}</Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <h3>{displayName}'s Albums</h3>
            <Carousel payload={payload} />
          </div>
          <div className="col-6">
            <h3>Similar Artists</h3>
            <Carousel payload={similarArtistsPayload} type="relatedArtist" />
          </div>
        </div>
      </Fragment>
    );

    return <div className="app-artist">{elements}</div>;
  }
}

export default ArtistPage;
