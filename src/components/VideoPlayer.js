import React from 'react';

export default class VideoPlayer extends React.Component {
  render = () => {
    return (
      <div className="Twitch-VideoPlayer">
        <iframe title="Body-VideoPlayer" src="https://player.twitch.tv/?channel=zerator" frameBorder="0" allowFullScreen="true" scrolling="no" height={this.props.height} width={this.props.width} ></iframe>
       </div>
    );
  }
      
}