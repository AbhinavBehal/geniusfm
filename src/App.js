import React, { Component } from 'react';
import './App.css';
import NowPlaying from './NowPlaying'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { value: '', submitted: false, track: null };
  }

  usernameSubmitted = (e) => {
    console.log(this.state.value);
    e.preventDefault();
    this.loadInfo();
  }

  loadInfo = async () => {
    const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${this.state.value}&api_key=${process.env.REACT_APP_LAST_FM_API_KEY}&format=json`);
    const json = await response.json();
    const currTrack = json.recenttracks.track[0];
    console.log(currTrack);
    // todo: check if currently playing
    const trackData = {
      name: currTrack.name,
      album: currTrack.album["#text"],
      artist: currTrack.artist["#text"],
      image: currTrack.image[currTrack.image.length - 1]["#text"]
    };
    console.log(trackData);
    this.setState({ submitted: true, track: trackData });
  }

  usernameChanged = (e) => {
    this.setState({ value: e.target.value });
    // todo: decide on what to do when there's no text
    if (e.target.value === '') {
      this.setState({ submitted: false });
    }
  }

  render() {
    return (
      <div className="app">
        <h1>genius.fm</h1>
        <form className="user-search" onSubmit={this.usernameSubmitted}>
          <input type="text" placeholder="your last.fm username" onChange={this.usernameChanged}></input>
        </form>
        <div className={`container ${this.state.submitted ? 'move-up' : ''}`}>
          {this.state.submitted && (
            <NowPlaying track={this.state.track} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
