import React from 'react';
import { Link } from 'react-router-dom';
import defaultImage from '../assets/unknown.jpeg';

export default class CarouselCard extends React.Component {
  render() {
    // console.log('CarouselCard props :', this.props);
    const { index } = this.props;
    let { url } = this.props.imageInfo ? this.props.imageInfo : '';
    const { name } = this.props;
    const { id } = this.props;
    const { type } = this.props;

    if (!url) {
      url = defaultImage;
    }

    const redirectURL = `/${type}/${id}`;

    if (index === 0)
      return (
        <div className="carousel-item active">
          <Link to={redirectURL}>
            <img className="d-block w-140" src={url} alt="album or artist" />
          </Link>
          <div className="carousel-caption d-none d-md-block">
            <h5>{name}</h5>
          </div>
        </div>
      );
    else
      return (
        <div className="carousel-item">
          <Link to={redirectURL}>
            <img className="d-block w-140" src={url} alt="album or artist" />
          </Link>
          <div className="carousel-caption d-none d-md-block">
            <h5>{name}</h5>
          </div>
        </div>
      );
  }
}
