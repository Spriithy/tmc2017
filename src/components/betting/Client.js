import React from 'react';

import BetTable from '../display/BetTable';
import Notification from '../modalspace/notification/Notification';

export default class Client extends React.Component {
  constructor(app) {
    super();

    this.app = app;

    this.local = window.location.href.indexOf("file://") > -1 || window.location.href.indexOf("localhost") > -1;
    this.twitchKey = this.local ? "miocs45t65k5y2ym8vtfq56lpofbocv" : "74q6uco0vgklzwgehthw3fbyfif54er";
    this.racers = [];
    this.websocket = null;
    this.wsUri = "ws://perso.mog-creations.com:43042/";

    this.bets = [];
    this.moderator = false;
    this.table = <BetTable bets={this.bets} />
    var conn;

   window.Twitch.init({ clientId: this.twitchKey }, function (error, status) {
      if (error)
        console.log(error);

      conn = status.authenticated;

      if (status.authenticated)
        console.log('Authenticated to Twitch!');
    })

    this.init();

    this.conn = conn;
    this.balance = 0; 
    this.gameON = false;
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
    this.nots = [];
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
    this.nots = this.nots.concat(<Notification type="error" title="Vous avez été deconnecté" text="Le serveur n'est plus acessible ... veuillez rafraichir la page" />)
  }

  onError = (evt) => {
    this.nots = this.nots.concat(<Notification type="error" title="Erreur" text={evt.data} />)
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
        if (data.error === 'BET_TIMER_ENDED') {
          this.nots = this.nots.concat([<Notification title={"Erreur"} text="Le temps pour parier est écoulé!" type="error" />]);
          break;
        }
        
        this.nots = this.nots.concat([<Notification title={"Erreur"} text={data.error} type="error" />]);
        break;
      case 4: // Place in Auth queue
        if (data.place > 1)
          this.nots = this.nots.concat(<Notification type="info" title="Veuillez patienter!" text={"Vous etes " + data.place + "-eme dans la file d'attente"} />)
        break;
      case 5: // Current currency packet
        this.balance = data.currency;
        break;
      case 6: // Current Bet value packet on a racer
        this.racers[data.racer_id].currentValue = data.bid_value;
        break;
      case 7: // Session start packet
        this.nots = this.nots.concat(<Notification type="info" title="Ouverture des mises!" text="Faites vos jeux!" />)
        this.gameON = true;
        this.racers = data.racers;
        this.racersNames = data.racers.map((r) => r.name);
        break;
      case 8: // Session end packet
        // const winner = data.winner;
        this.winner = this.racers[data.winner].name;
        this.racers = [];
        this.bets = [];
        this.table = <BetTable bets={this.bets} />
        this.nots = this.nots.concat([<Notification type="success" title={"Victoire de " + this.winner} text="" />])
        break;
      case 9: // Bet currently placed
        this.gameON = false;
        break;
      case 10: // New emplaced bet 
        //{ id: 10, name: "AlexMogTV", twitch_id: 74010347, racer_id: 0, currency: 100 }
        this.bets = this.bets.concat({ player: data.name, racer: this.racers[data.racer_id].name, value: data.currency });
        this.table = <BetTable bets={this.bets} />
        console.log({ player: data.name, racer: this.racersNames[data.racer_id].name, value: data.currency })
        break;
      default:
        console.log("PACKET NOT IMPLEMENTED");
        console.log(data);
    }

    this.app.forceUpdate();
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

  endSession = (val) => {
    this.send({ id: 8, winner: val });
  }

  sendBid = (id, val) => {
    var bet = parseInt(val, 10)

    if (isNaN(bet)) {
      this.nots = this.nots.concat(<Notification type="error" title="Erreur de saisie" text="La mise n'est pas un nombre!" />)
      return;
    }

    if (bet > this.balance) {
      this.nots = this.nots.concat(<Notification type="error" title="Erreur!" text="Montant du pari trop élevé!" />)
      return;
    }

    this.balance -= bet;
    this.gameON = false;

    this.send({ id: 9, racer_id: id, value: bet });
  }

  coteOf = (i) => {
    return (this.racers.map((r) => r.currentValue).reduce((pv, cv) => pv+cv, 0) - this.racers[i].currentValue)/this.bets.length;
  }

}