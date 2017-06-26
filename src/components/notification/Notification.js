import React, { Component } from 'react';

export default class Notification extends Component {
  render = () => {
    return (
      <div className={"notification-" + this.props.type}>
        <span>×</span>
        <h1>{this.props.title}</h1>
        <p>{this.props.text}</p>
      </div>
    );
  }
}