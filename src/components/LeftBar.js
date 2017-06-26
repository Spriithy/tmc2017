import React from 'react';

import BetTable from './display/BetTable';

import './Layout.css';

export default class LeftBar extends React.Component {
  render = () => {
    return (
      <div className="LeftBar">
        <h1 className="LeftBar-Header">Zrt Cup 2017</h1>
        {this.props.client.table}
      </div>
    );
  }
}