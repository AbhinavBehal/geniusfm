import React, { Component } from 'react'
import './NowPlaying.css'

class NowPlaying extends Component {
	render() {
		return (
			<div className="now-playing">
				<h2>now playing</h2>
				<div className="album-art">
					<div className="album-img">
						<img alt="album art" src="https://upload.wikimedia.org/wikipedia/en/a/ae/Favourite_Worst_Nightmare.jpg"></img>
					</div>
					<div className="info">
						<span><b>Old Yellow Bricks</b></span>
						<span>by <b>Arctic Monkeys</b></span>
						<span>on <b>Favorite Worst Nightmare</b></span>
						<span><b>2007</b></span>
					</div>
				</div>
			</div >
		);
	}
}

export default NowPlaying;