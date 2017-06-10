import React from 'react';

export default class Client extends React.Component {
  constructor(app) {
    super();

    this.app = app;

    this.local = window.location.href.indexOf("file://") > -1 || window.location.href.indexOf("localhost") > -1;
    this.twitchKey = this.local ? "miocs45t65k5y2ym8vtfq56lpofbocv" : "74q6uco0vgklzwgehthw3fbyfif54er";
    this.racers = [];
    this.websocket = null;
    this.wsUri = "ws://perso.mog-creations.com:43042/";

    this.moderator = false;
    var init = this.init;
    var conn;

    window.Twitch.init({ clientId: this.twitchKey }, function (error, status) {
      if (error)
        console.log(error);

      conn = status.authenticated;

      if (status.authenticated) {
        console.log('Authenticated to Twitch!');
        init();
      }
    })

    this.conn = conn;
    this.balance = 0;  
  }

  init = () => {
    if (this.websocket != null && this.websocket.readyState === this.websocket.OPEN) {
      this.websocket.close();
      this.closed = true;
    }

    // Initialisation
    this.websocket = new WebSocket(this.wsUri);
    this.websocket.onopen = this.onOpen;
    this.websocket.onclose = this.onClose;
    this.websocket.onmessage = this.onMessage;
    this.websocket.onerror = this.onError;
    this.closed = false;
  }

  login = () => {
    try {
      window.Twitch.login({
        redirect_uri: this.local ? 'http://localhost:8000/' : 'http://tmc2017.mog-creations.com/',
        scope: ['user_read']
      });
    } catch (e) {
      console.log(e);
    }
  }

  onOpen = (evt) => {
    console.log('CONNECTED');
    this.send({ id: 1, protocolVersion: 1 });
  }

  onClose = (evt) => {
    console.log('DISCONNECTED');
  }

  onError = (evt) => {
    console.log('ERROR: ' + evt.data);
  }

  onMessage = (evt) => {
    var data = JSON.parse(evt.data);
    console.log('RECEIVED:');
    console.log(data);

    switch (data.id) {
      case 1: // HandShake packet
        if (!data.status) alert("Bad protocol version. Please update your client.");
        else this.send({
          id: 2,
          token: window.Twitch.getToken()
        });
        break;
      case 2: // Auth status packet, defines if moderator or not
        this.moderator = data.moderator;
        console.log('PLAYER STATUS: ' + (this.moderator ? 'MOD' : 'NONE'));
        break;
      case 3: // Error packet
        alert(data.error);
        break;
      case 4: // Place in Auth queue
        // TODO...
        break;
      case 5: // Current currency packet
        this.balance = data.currency;
        break;
      case 6: // Current Bet value packet on a racer
        this.racers[data.racer_id].currentValue = data.bid_value;
        break;
      case 7: // Session start packet
        this.racers = data.racers;
        console.log(this.racers)
        break;
      case 8: // Session end packet
        // const winner = data.winner;
        this.winner = this.racers[data.winner].name;
        this.racers = [];
        break;
      case 9: // Bet currently placed
        break;
      default:
        console.log("PACKET NOT IMPLEMENTED");
        console.log(data);
    }

    this.app.forceUpdate();

    console.log('RACERS:')
    console.log(this.racers)
  }

  send = (toSend, stringify = true) => {
    var snd = stringify ? JSON.stringify(toSend) : toSend;
    console.log('SENDING:');
    console.log(snd);
    this.websocket.send(snd);
  }

  startSession = (racers) => {
    this.send({
      id: 7,
      racers: racers,
      end_timer: 60
    });
  }

  endSession = (id) => {
    var val = parseInt(id, 10);
    if (isNaN(val)) {
      alert("Une valeur numérique entière est naisséssaire.");
      return;
    }

    this.send({ id: 8, winner: val });
  }

  coteOf = (i) => {
    if (this.racers[i].currentValue === 0)
      return 1;

    return this.racers.map((r) => r.currentValue).reduce((p, c) => p + c, 0) / this.racers[i].currentValue;
  }

}