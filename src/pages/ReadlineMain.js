/*
 * @providesModule ReadlineMain
 */

'use strict';

import React from 'react';
import {PageChannel} from '../helpers/Channel';
import ProgramStore from '../helpers/ProgramStore';

import Header from '../components/Header';
import ProgramListing from '../components/ProgramListing';

import Base from '../blocks/Base';
import blockRegistry from '../blocks/blockRegistry';

const SERVER_NAME = 'readline.io';


export default class ReadlineMain extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      items: [],
      programs: []
    };
  }

  componentDidMount() {
    // TODO: security for all these channels
    // TODO: allow dashes in channel ids
    let sendChannelId = this.props.pageId;
    this.sendChannel = new PageChannel('http://' + SERVER_NAME + '/channel/', sendChannelId);

    let clientChannelId = this.sendChannel.sessionId;
    this.recvChannel = new PageChannel('http://' + SERVER_NAME + '/channel/', clientChannelId);
    this.recvChannel.listen();

    this.recvChannel.onMessage((message) => {
      console.log('Appending message:', message);
      this.setState({
        items: this.state.items.concat([message])
      });
    });
    this.sendChannel.sendStart();

    this.programStore = new ProgramStore('http://' + SERVER_NAME + '/program');
    this.programStore.onValue((programs) => {
      this.setState({programs});
    });
  }

  send(message) {
    this.sendChannel.send(message);
  }

  sendCall(fn, args, kwargs) {
    this.sendChannel.sendCall(fn, args, kwargs);
  }

  renderItemDefault(item) {
    return (
      <h2>{item}</h2>
    );
  }

  renderItemInner(item) {
    let Factory = Base.blockRegistry[item.type];
    if (!Factory) {
      console.warn("Invalid block type:", item.type);
      return this.renderItemDefault(item);
    } else {
      return (
        <Factory
          item={item}
          send={(message) => this.send(message)}
          sendCall={(fn, args, kwargs) => this.sendCall(fn, args, kwargs)}
          />
      );
    }
  }

  renderItem(item, index) {
    return (
      <section key={index} className="readline-item card">
        {this.renderItemInner(item)}
      </section>
    )
  }

  render() {
    return (
      <section className="outer">
        <Header />
        <section className="container">
          <section className="content-left">
            <h1>Recent Programs</h1>
            <ProgramListing programs={this.state.programs} />
          </section>
          <section className="content-main">
            { this.state.items.map((item, index) => (this.renderItem(item, index))) }
          </section>
        </section>
      </section>
    );
  }

}


ReadlineMain.defaultProps = {
  pageId: 'index'
};
