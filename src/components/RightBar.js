import React from 'react';

import './Layout.css';

export default class RightBar extends React.Component {
  render = () => {
    return (
      <div className="RightBar" style={{ width: this.props.display ? "20%" : "0px"}}>
        <iframe title="RightBar-Chat" src="https://www.twitch.tv/zerator/chat?popout=" frameBorder="0" scrolling="no" height="100%" width="100%" ></iframe>
      </div>
    );
  }
}