import React from 'react';

import '../../styles/shared.css';

export default class RacerInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  handleValidate = (name) => () => {
    this.setState({ value: '' });

    this.props.client.sendBid(
        name, this.state.value
    );
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  render = () => {
    return (
      <div className="BetInputWrapper" style={{ display: this.props.client.racers.length === 0 ? "none" : "inline-block" }}>
        <div className="Label">A votre tour de miser !</div>
        <input className="Input" type="text" placeholder="Somme" value={this.state.value} onChange={this.handleChange} />
        {this.props.racers.map((r) => <button className="Button" onClick={this.handleValidate(r)}>{r.name}</button>)}
      </div>
    );
  }
}