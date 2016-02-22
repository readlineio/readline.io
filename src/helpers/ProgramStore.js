/**
 * @providesModule ProgramStore
 */

"use strict";

import {EventEmitter} from 'events';

// TODO: move this into utilities
function sleep(timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, timeout);
  });
}

class ProgramStore {

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.updateEvents = new EventEmitter();
    this.lastValue = null;
    this.listen();
  }

  async listen() {
    let response = await fetch(this.baseUrl + '/list');
    if (response.status == 200) {
      let message = await response.json();
      console.log("Initial value of program status:", message);
      this.lastValue = message;
      this.updateEvents.emit('value', message);
    }
    while (true) {
      response = await fetch(this.baseUrl + '/updates');
      if (response.status == 200) {
        let message = await response.json();
        console.log("Update received on program status:", message);
        this.lastValue = message;
        this.updateEvents.emit('value', message);
      } else {
        console.log("Error getting updates");
        await sleep(1000);
      }
    }
  }

  onValue(callback) {
    if (this.lastValue) {
      callback(this.lastValue);
    }
    this.updateEvents.addListener('value', callback);
  }

}


export default ProgramStore;