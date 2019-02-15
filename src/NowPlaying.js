import React, { Component } from 'react'
import './NowPlaying.css'

class NowPlaying extends Component {
  render() {
    return (
      <div className="now-playing">
        <div>
          <h2>now playing</h2>
          <div className="album-art">
            <div className="album-img">
              <img alt="album art" src={this.props.track.image}></img>
            </div>
            <div className="info">
              <span><b>{this.props.track.title}</b></span>
              <span>by <b>{this.props.track.artist}</b></span>
              <span>on <b>{this.props.track.album}</b></span>
            </div>
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