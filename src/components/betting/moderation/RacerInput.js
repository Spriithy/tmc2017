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

    if (this.state.value.trim().length > 0)
      this.props.client.startSession(
        this.state.value.split(',').map((r) => r.trim())
      );
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  render = () => {
    return (
      <div className="ModerationRacerInput" style={{ display: this.props.client.racers.length !== 0 ? "none" : "inline-block" }}>
        <div className="Label">Saisissez le nom des participants</div>
        <input className="Input GroupedInput" type="text" placeholder="CarlJr, Ayako, ..." value={this.state.value} onChange={this.handleChange}/>
        <button className="Button GroupedButton" onClick={this.handleValidate}>Lancer</button>
      </div>
    );
  }
}