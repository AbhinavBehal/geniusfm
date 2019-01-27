import React, { Component } from 'react';
import './App.css';
import NowPlaying from './NowPlaying'
import trackLoader from './trackLoader';

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
    const track = await trackLoader(this.state.value);
    this.setState({ submitted: true, track: track });
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
