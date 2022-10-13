import React, { Component } from "react";
import PropTypes from "prop-types";
import { connectArtistHeader } from "containers/Artist/ArtistHeaderContainer";

export class ArtistHeader extends Component {
  componentDidMount() {
    this.props.loadArtist(this.props.id);
  }

  componentDidUpdate(prevProps) {
    const {id, loadArtist} = this.props;
    if (id !== prevProps.id) {
      loadArtist(id);
    }
  }

  follow = () => {
    this.props.followArtist(this.props.artist);
  }

  unfollow = () => {
    this.props.unfollowArtist(this.props.id);
  }

  render() {
    const {image, name} = this.props.artist;
    return (
      <header
        className="artist-header bg-center flex-center"
        style={{backgroundImage: `url(${image})`}}
      >
        <div className="artist-header__info">
          <h1 className="artist-header__name">{name}</h1>
        </div>
      </header>
    );
  }
}

ArtistHeader.propTypes = {
  id: PropTypes.string.isRequired,
  artist: PropTypes.object.isRequired,
  loadArtist: PropTypes.func.isRequired,
  followArtist: PropTypes.func.isRequired,
  unfollowArtist: PropTypes.func.isRequired,
};

export default connectArtistHeader(ArtistHeader);