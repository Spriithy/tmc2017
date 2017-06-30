import React, { Component } from 'react';
import './style.css';

var $ = window.$; 

var id = 0;

export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.id = id++;
  }

  dismiss = () => {
    $('#not-' + this.id).remove();
  }

  render = () => {
    return (
      <div id={"not-" + this.id} className={"Notification Notification-" + this.props.type}>
        <span onClick={this.dismiss}>×</span>
        <h1>{this.props.title}</h1>
        <p>{this.props.text}</p>
      </div>
    );
  }
}