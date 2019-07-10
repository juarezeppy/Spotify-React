import React from 'react';
import './Thermometer.css';

export default class Thermometer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id
    };
  }

  componentDidMount() {
    fetch(`http://localhost:8888/track-audio-features/${this.state.id}`).then(
      (response) => {
        response.json().then((parsedBody) => {
          const percentMultiplier = 100;
          this.setState({
            ...this.state,
            danceability: parsedBody.danceability * percentMultiplier,
            energy: parsedBody.energy * percentMultiplier,
            acousticness: parsedBody.acousticness * percentMultiplier,
            speechiness: parsedBody.speechiness * percentMultiplier,
            instrumentalness: parsedBody.instrumentalness * percentMultiplier,
            liveness: parsedBody.liveness * percentMultiplier,
            valence: parsedBody.valence * percentMultiplier
          });
        });
      }
    );
  }
  render() {

    //audio feature widths
    const danceabilityWidth = {
      width: `${parseFloat(this.state.danceability).toFixed(2)}%`
    };

    const energyWidth = {
      width: `${parseFloat(this.state.energy).toFixed(2)}%`
    };

    const acousticnessWidth = {
      width: `${parseFloat(this.state.acousticness).toFixed(2)}%`
    };

    const speechinessWidth = {
      width: `${parseFloat(this.state.speechiness).toFixed(2)}%`
    };

    const instrumentalnessWidth = {
      width: `${parseFloat(this.state.instrumentalness).toFixed(2)}%`
    };

    const livenessWidth = {
      width: `${parseFloat(this.state.liveness).toFixed(2)}%`
    };

    const valenceWidth = {
      width: `${parseFloat(this.state.valence).toFixed(2)}%`
    };

    return (
      <div>
        <div className="progress">
          <div
            className="progress-bar bg-danger"
            role="progressbar"
            style={danceabilityWidth}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            Danceability {danceabilityWidth.width}
          </div>
        </div>
        <div className="progress">
          <div
            className="progress-bar bg-warning"
            role="progressbar"
            style={energyWidth}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            Energy {energyWidth.width}
          </div>
        </div>
        <div className="progress">
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={acousticnessWidth}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            Acousticness {acousticnessWidth.width}
          </div>
        </div>
        <div className="progress">
          <div
            className="progress-bar bg-info"
            role="progressbar"
            style={speechinessWidth}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            Speechiness {speechinessWidth.width}
          </div>
        </div>
        <div className="progress">
          <div
            className="progress-bar bg-primary"
            role="progressbar"
            style={instrumentalnessWidth}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            Instrumentalness {instrumentalnessWidth.width}
          </div>
        </div>
        <div className="progress">
          <div
            className="progress-bar bg-secondary"
            role="progressbar"
            style={livenessWidth}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            Liveness {livenessWidth.width}
          </div>
        </div>
        <div className="progress">
          <div
            className="progress-bar bg-dark"
            role="progressbar"
            style={valenceWidth}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            Valence {valenceWidth.width}
          </div>
        </div>
      </div>
    );
  }
}
