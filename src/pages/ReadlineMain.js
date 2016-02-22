/*
 * @providesModule ReadlineMain
 */

'use strict';

import React from 'react';
import {PageChannel} from '../helpers/Channel';
import {BaseStyles} from '../constants/Constants';
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
      <section key={index} style={Object.assign({}, styles.item, BaseStyles.card)}>
        {this.renderItemInner(item)}
      </section>
    )
  }

  render() {
    return (
      <section style={styles.outer}>
        <Header />
        <section style={styles.container}>
          <section style={styles.contentLeft}>
            <h1 style={styles.programHeader}>Recent Programs</h1>
            <ProgramListing programs={this.state.programs} />
          </section>
          <section style={styles.contentMain}>
            { this.state.items.map((item, index) => (this.renderItem(item, index))) }
          </section>
        </section>
      </section>
    );
  }

}

const containerWidth = 960;
const contentLeftWidth = 280;
const contentMainWidth = containerWidth - contentLeftWidth;


let styles = {

  programHeader: {
    padding: '20px',
    fontWeight: '500',
    margin: '10px 0'
  },

  outer: {
    width: '100%'
  },

  container: {
    /* background-color: #66BBB5; */
    /* background-color: #EEEEEE; */
    width: containerWidth,
    margin: '20px auto',
    display: 'flex',
    flexDirection: 'row'
  },

  contentLeft: {
    width: contentLeftWidth
  },
  contentMain: {
    width: contentMainWidth
  },

  item: {
    padding: 20,
    marginBottom: 10
  }

};


ReadlineMain.defaultProps = {
  pageId: 'index'
};
