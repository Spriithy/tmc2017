import React from 'react';

export default class ChatToggle extends React.Component {
  render = () => {
    return (
      <button className="ChatToggle" onClick={this.props.toggleChat}>Chat {this.props.chat ? "▶" : "◀"}</button>
    );
  }
}