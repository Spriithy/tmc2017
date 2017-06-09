import React from 'react';

import Moderation from './moderation/Moderation';
import BetInput from './BetInput';

import './index.css';

export default class BettingUI extends React.Component {
  render = () => {
    return (
      <div className="BettingUI">
        <h1 className="Currency">Vous possédez <span className="Balance">{this.props.client.balance}</span> zCoins</h1>
        {this.props.mod ? <Moderation client={this.props.client} /> : <span></span>}
        <BetInput client={this.props.client} racers={this.props.client.racers}/>
      </div>
    );
  }
}