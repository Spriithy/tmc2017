import React from 'react';

import WinnerSelect from './WinnerSelect';
import RacerInput from './RacerInput';

import './moderation.css';

export default class Moderation extends React.Component {
  render = () => {
    return (
      <div className="Moderation">
        <RacerInput client={this.props.client} />
        <WinnerSelect client={this.props.client} />
      </div>
    );
  }
}