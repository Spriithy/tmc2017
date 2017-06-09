import React from 'react';

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
      <div className="WinnerWrapper">
        <select className="WinnerSelect" onChange={this.handleChange} id="winner-select">
          <option selected disabled>Vainqueur ...</option>
          {this.props.client.racers.map((r, i) => <option value={i}>{r.name}</option>)}
        </select>
        <button className="WinnerValidate" onClick={this.handleValidate}>Valider</button>
      </div>
    );
  }
}