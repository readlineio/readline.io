/*
 * @providesModule ReadlineMain
 */

'use strict';

import React from 'react';
import {PageChannel} from '../helpers/Channel';
import Base from '../blocks/Base';
import blockRegistry from '../blocks/blockRegistry';

const SERVER_NAME = 'localhost:8888';


export default class ReadlineMain extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    // TODO: security for all these channels
    // TODO: allow dashes in channel ids
    let clientChannelId = this.props.pageId + 'Client';
    this.recvChannel = new PageChannel('http://' + SERVER_NAME + '/channel/', clientChannelId);
    this.recvChannel.listen();

    this.recvChannel.onMessage((message) => {
      console.log('Appending message:', message);
      this.setState({
        items: items.concat([message])
      });
    });

    let sendChannelId = this.props.pageId;
    this.sendChannel = new PageChannel('http://' + SERVER_NAME + '/channel/', sendChannelId);
    this.sendChannel.sendStart();
  }

  send(message) {
    this.sendChannel.send(message);
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
        <Factory item={item} send={(message) => this.send(message)} />
      );
    }
  }

  renderItem(item) {
    return (
      <section className="readline-item">
        {this.renderItemInner(item)}
      </section>
    )
  }

  render() {
    return (
      <section className="container">
        <h1>ReadlineIO Main</h1>
        { this.state.items.map((item) => (this.renderItem(item))) }
      </section>
    );
  }

}


ReadlineMain.defaultProps = {
  pageId: 'index'
};
