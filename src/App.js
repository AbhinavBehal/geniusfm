import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  usernameSubmitted = (e) => {
    console.log(this.state.value);
    e.preventDefault();
  }

  usernameChanged = (e) => {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <div className="app">
        <h1>genius.fm</h1>
        <form className="user-search" onSubmit={this.usernameSubmitted}>
          <input type="text" placeholder="your last.fm username" onChange={this.usernameChanged}></input>
        </form>
      </div>
    );
  }
}

export default App;
