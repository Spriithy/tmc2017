import React from 'react';

import './moderation.css';

export default class RacerInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }
  
  handleValidate = (event) => {
    event.preventDefault();

    this.setState({ value: '' });

    this.props.client.startSession(
      this.state.value.split(',').map((r) => r.trim())
    );
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  render = () => {
    return (
      <div className="ModerationRacerInput">
        <input className="RacerInput" type="text" placeholder="CarlJr, Ayako, ..." value={this.state.value} onChange={this.handleChange}/>
        <button className="RacerValidate" onClick={this.handleValidate}>Lancer</button>
      </div>
    );
  }
}