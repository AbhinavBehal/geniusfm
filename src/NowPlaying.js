import React, { Component } from 'react'
import './NowPlaying.css'

class NowPlaying extends Component {
	render() {
		return (
			<div className="now-playing">
				<h2>now playing</h2>
				<div className="album-art">
					<div className="album-img">
						<img alt="album art" src={this.props.track.image}></img>
					</div>
					<div className="info">
						<span><b>{this.props.track.name}</b></span>
						<span>by <b>{this.props.track.artist}</b></span>
						<span>on <b>{this.props.track.album}</b></span>
					</div>
				</div>
			</div >
		);
	}
}

export default NowPlaying;