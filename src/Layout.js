import React, { Component } from 'react';

import LeftBar from './components/LeftBar';
import Body from './components/Body';
import RightBar from './components/RightBar';

import Client from './components/betting/Client';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chat: this.props.chat,
      client: new Client(this)
    };
  }

  toggleChat = () => {
    this.setState({ chat: !this.state.chat });
  }

  handleOnResize = () => {
    if (window.innerWidth < 1200)
      this.setState({ chat: false });
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    this.handleOnResize();
    window.addEventListener("resize", this.handleOnResize);
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleOnResize);
  }

  render = () => {
    return (
      <div >
        <LeftBar client={this.state.client} />
        <Body toggleChat={this.toggleChat} chat={this.state.chat} client={this.state.client} />
        <RightBar display={this.state.chat} />
      </div>
    );
  }
}