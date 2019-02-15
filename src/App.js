import React, { Component } from 'react';
import { ScaleLoader } from 'react-spinners';
import './App.css';
import NowPlaying from './NowPlaying';
import Annotation from './Annotation';
import trackLoader from './trackLoader';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', submitted: false, track: null, loading: false };
  }

  usernameSubmitted = (e) => {
    e.preventDefault();
    this.loadInfo();
  }

  loadInfo = async () => {
    this.setState({ loading: true });
    const track = await trackLoader(this.state.username);
    track.lyrics = track.referents.map((r, index) => {
      return <Annotation key={index} lyrics={r.lyrics} annotation={r.annotation}></Annotation>
    });
    this.setState({ submitted: true, track: track, loading: false });
  }

  usernameChanged = (e) => {
    this.setState({ username: e.target.value });
    if (e.target.username === '') {
      this.setState({ submitted: false });
    }
  }

  render() {
    return (
      <div className="app">
        <h1>genius.fm</h1>
        {
          this.state.loading ?
            (
              <ScaleLoader
                loading={this.state.loading}>
              </ScaleLoader>
            ) :
            (
              <form
                className={`user-search ${this.state.submitted ? 'submitted' : ''}`}
                onSubmit={this.usernameSubmitted}>
                <input
                  type="text"
                  placeholder="your last.fm username"
                  value={this.state.username}
                  onChange={this.usernameChanged}>
                </input>
              </form>
            )
        }
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
