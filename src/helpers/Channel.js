/**
 * @providesModule Channel
 */

"use strict";

import {EventEmitter} from 'events';
import _ from 'lodash';
import uuid from 'uuid';


class Channel {

  constructor(baseUrl, channelId) {
    this.baseUrl = baseUrl;
    this.channelId = channelId;
    this.messageEmitter = new EventEmitter();
    this._runRecvLoop();
  }

  send(message) {
    let url = this.baseUrl + this.channelId;
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(message)
    });
  }

  onMessage(callback) {
    this.messageEmitter.addListener('message', callback);
  }

  async _runRecvLoop() {
    let url = this.baseUrl + this.channelId;
    while (true) {
      let response = await fetch(channelUrl);
      if (response.status === 200) {
        let message = await response.json();
        this.messageEmitter.emit('message', message);
      } else {
        console.log("Empty response from channel, restarting connection.");
      }
    }
  }

}


class PageChannel extends Channel {

  constructor(baseUrl, channelId) {
    super(baseUrl, channelId);
    this.sessionId = uuid.v4();
  }

  sendStart() {
    let message = {
      action: 'start',
      session: this.sessionId
    };
    this.send(message);
  }

  sendCall(functionName, args, keywordArgs) {
    let message = {
      action: 'call',
      session: this.sessionId,
      fnname: functionName,
      args: args,
      kwargs: keywordArgs
    };
    this.send(message);
  }

}


module.exports = {
  Channel,
  PageChannel
};

