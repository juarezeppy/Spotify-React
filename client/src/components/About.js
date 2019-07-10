//------------------------------------------------------------------------------------------------
// The About component displays information about the currently logged in user, such as their
// displayName, photo, and a button that opens a new window to their Spotify profile.
//------------------------------------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import './About.css';

//------------------------------------------------------------------------------------------------
// START class About
//------------------------------------------------------------------------------------------------
class About extends React.Component {
  //constructor and state variables
  constructor() {
    super();
    this.state = {
      toggleInfo: false
    };
  }

  //keeps track of toggled state
  toggle = () => {
    this.setState({
      toggleInfo: !this.state.toggleInfo
    });
  };

  render() {
    const { displayName } = this.props.userData;
    const { externalURL } = this.props.userData;

    //contains the elements to be rendered on the homepage
    let elements = (
      <Fragment>
        <h3>Logged In User: {displayName} </h3>
        <img src={this.props.userData.imageURL} alt="" />
        <p>
          <a href={externalURL} className="btn btn-light" target="_blank">
            Open profile on Spotify
          </a>
        </p>
      </Fragment>
    );

    //changes button text depending on toggle state
    const { toggleInfo } = this.state;
    const buttonText = !toggleInfo ? 'Load Info About Me' : 'Hide Info';

    return (
      <div className="col-6">
        <button className="btn btn-light" onClick={this.toggle}>
          {buttonText}
        </button>
        {toggleInfo ? elements : null}
      </div>
    );
  }
}
//------------------------------------------------------------------------------------------------
// END class About
//------------------------------------------------------------------------------------------------

const mapStateToProps = (state) => {
  return {
    userData: state.userInfo
  };
};

export default connect(mapStateToProps)(About);

//------------------------------------------------------------------------------------------------
// END About component
//------------------------------------------------------------------------------------------------
