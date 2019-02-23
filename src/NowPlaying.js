import React, { Component } from 'react'
import './NowPlaying.css'

class NowPlaying extends Component {
  render() {
    return (
      <div className="now-playing">
        <div className="song-details">
          <h2>now playing</h2>
          <div className="album-art">
            <img alt="album art" src={this.props.track.image}></img>
          </div>
          <div className="info">
            <p><b>{this.props.track.title}</b></p>
            <p>by <b>{this.props.track.artist}</b></p>
            {this.props.track.album && (<p>on <b>{this.props.track.album}</b></p>)}
          </div>
        </div>
        <div className="lyrics">
          {this.props.track.lyrics}
        </div>
      </div >
    );
  }
}

export default NowPlaying;