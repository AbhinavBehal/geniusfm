import React, { Component } from 'react'
import './Annotation.css'

class Annotation extends Component {
  constructor(props) {
    super(props);
    this.state = { showDetails: false };
  }

  toggleDetails = () => {
    this.setState({ showDetails: !this.state.showDetails });
  }

  render() {
    return (
      <div className="annotation">
        <div
          className={`lyric ${this.props.annotation ? 'lyric-has-details' : ''}`}
          onClick={this.toggleDetails}
          dangerouslySetInnerHTML={{ __html: this.props.lyrics }}></div>
        {this.state.showDetails && this.props.annotation && (
          <div className="details" dangerouslySetInnerHTML={{ __html: this.props.annotation }}></div>
        )}
      </div>
    );
  }
}

export default Annotation;