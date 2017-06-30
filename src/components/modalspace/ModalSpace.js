import React, { Component } from 'react';

import './style.css';

export default class ModalSpace extends Component {
  render = () => {
    return (
      <div className="ModalSpace">
        {this.props.nots}
      </div>
    );
  }
}