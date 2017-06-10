import React from 'react';

import '../../../styles/shared.css';

export default class WinnerSelect extends React.Component {

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  handleValidate = (event) => {
    event.preventDefault();
    this.props.client.endSession(this.state.value);
  }

  render = () => {
    return (
      <div className="WinnerWrapper" style={{ display: this.props.client.racers.length === 0 ? "none" : "inline-block" }}>
        <div className="Label">Choisissez le vainqueur</div>
        <select className="Input GroupedSelect" onChange={this.handleChange} id="winner-select">
          <option selected disabled>Vainqueur ...</option>
          {this.props.client.racers.map((r, i) => <option value={i}>{r.name}</option>)}
        </select>
        <button className="Button GroupedButton" onClick={this.handleValidate}>Valider</button>
      </div>
    );
  }
}