import React from 'react';

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
      <div className="BetInputWrapper">
        <input className="BetInput" type="text" placeholder="Somme" value={this.state.value} onChange={this.handleChange} />
        <div className="BetInput-Choices">
          {this.props.racers.map((r) => <span className="BetInput-Option" onClick={this.handleValidate(r)}>{r.name}</span>)}
        </div>
      </div>
    );
  }
}