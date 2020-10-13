import './AudioPlayer.css';
import React from 'react';

class AudioPlayer extends React.Component {
  render() {
    let uri = this.props.selectedURI.split(':')[2];
    let src = `https://open.spotify.com/embed/track/${uri}?autoplay=1`;
    return (
      <iframe src={src} width="100%" height="300" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    )
  }
}

export default AudioPlayer;
