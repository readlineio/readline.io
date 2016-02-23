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
import ProgramOutput from '../components/ProgramOutput';


const SERVER_NAME = 'readline.io';


export default class ReadlineMain extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      items: [],
      programs: [],
      containerWidth: 960
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

  render() {
    return (
      <section style={styles.outer}>
        <Header containerWidth={containerWidth}/>
        <section style={styles.container}>

          <section style={styles.contentLeft}>
            <h1 style={styles.programHeader}>Recent Programs</h1>
            <ProgramListing programs={this.state.programs} />
          </section>

          <section style={styles.contentMain}>
            <ProgramOutput
              items={this.state.items}
              send={(message) => this.send(message)}
              sendCall={(fn, args, kwargs) => this.sendCall(fn, args, kwargs)}
            />
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
  }

};


ReadlineMain.defaultProps = {
  pageId: 'index'
};
