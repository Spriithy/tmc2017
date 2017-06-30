import React from 'react';

import './style.css';

export default class BetTable extends React.Component {
  render = () => {
    return (
      <table className="BetTable">
        <tr>
          <th>Participant</th>
          <th>Mise</th>
          <th>Joueur</th>
        </tr>
        {this.props.bets.map((b) => <tr><td>{b.player}</td><td>{b.value}</td><td>{b.racer}</td></tr>)}
      </table>
    );
  }
}