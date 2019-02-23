import React, { Component } from 'react';
import { ScaleLoader } from 'react-spinners';
import './App.css';
import NowPlaying from './NowPlaying';
import Annotation from './Annotation';
import trackLoader from './trackLoader';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      submitted: false,
      track: null,
      loading: false,
      error: null
    };
  }

  componentDidMount() {
    const username = localStorage.getItem('username');
    if (username) {
      this.setState({ username: username }, this.loadInfo);
    }
  }

  usernameSubmitted = (e) => {
    e.preventDefault();
    localStorage.setItem('username', this.state.username);
    this.loadInfo();
  }

  loadInfo = async () => {
    this.setState({ submitted: false, loading: true, error: null });
    try {
      console.log(this.state.username);
      const track = await trackLoader(this.state.username);
      track.lyrics = track.referents.map((r, index) => {
        return <Annotation key={index} lyrics={r.lyrics} annotation={r.annotation}></Annotation>
      });
      this.setState({ submitted: true, track: track, loading: false, error: null });
    } catch (err) {
      this.setState({ loading: false, error: err.message });
    }
  }

  usernameChanged = (e) => {
    this.setState({ username: e.target.value, error: null });
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
        {
          this.state.error && (
            <p className="error">{this.state.error}</p>
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
