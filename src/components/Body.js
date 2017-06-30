import React from 'react';

import ChatToggle from './ChatToggle';
import VideoPlayer from './VideoPlayer';
import BettingUI from './betting/BettingUI';
import ModalSpace from './modalspace/ModalSpace';

import $ from 'jquery';

import './Layout.css';
import './betting/moderation/moderation.css';
import './betting/index.css';

export default class Body extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerWidth: 900,
      playerHeight: 500,
    };
  }

  updatePlayerDimensions = () => {
    const w = $('.Body').width();

    if (w < 1000)
      this.setState({ playerWidth: 0.9 * w });
    else
      this.setState({ playerWidth: 900 + 0.1 * w });

    this.setState({ playerHeight: this.state.playerWidth * 9 / 16 })
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    this.updatePlayerDimensions();
    window.addEventListener("resize", this.updatePlayerDimensions);
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePlayerDimensions);
  }

  render = () => {
    return (
      <div className="Body" style={{width: this.props.chat ? "60%" : "80%"}}>
        <ModalSpace nots={this.props.client.nots}/>
        <ChatToggle chat={this.props.chat} toggleChat={this.props.toggleChat} />
        <VideoPlayer width={this.state.playerWidth} height={this.state.playerHeight} />
        <div className="UI-Wrapper">
          {this.props.client.conn ? <BettingUI client={this.props.client} mod={this.props.client.moderator}/> : <button className="LoginButton" onClick={this.props.client.login}></button>}
        </div>
        <div className="Credits">Copyrights © <a href="https://twitter.com/AlexMog_FR">@AlexMog</a> et <a href="https://twitter.com/TheophileDano">@Spriithy</a></div>
      </div>
    );
  }
}