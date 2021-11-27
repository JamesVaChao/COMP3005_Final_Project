import React, { Component } from 'react';

class Goodbye extends Component {
  handleClick() {
    this.props.history.push('/');
  }
  render() {
    return (
      <button type="button" onClick={() => this.handleClick()}>
        Hello
      </button>
    );
  }
};

export default Goodbye;