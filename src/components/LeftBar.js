import React from 'react';

import './Layout.css';

export default class LeftBar extends React.Component {
  render = () => {
    return (
      <div className="LeftBar">
        <h1 className="LeftBar-Header">Zrt Cup 2017</h1>
        <div className="LeftBar-Racers" style={{display: this.props.client.racers.length > 0 ? "block" : "none"}}>
          <ul>
            {this.props.client.racers.map((r, i) => <li><span className="rname">{r.name}</span> <span className="rinfo">{r.currentValue} ({this.props.client.coteOf(i)})</span></li>)}
          </ul>
        </div>
        {this.props.client.table}
      </div>
    );
  }
}