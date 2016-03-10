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
    // TODO: Move this to program start
    let sendChannelId = this.props.pageId;
    this.sendChannel = new PageChannel('https://' + SERVER_NAME + '/channel/', sendChannelId);

    let clientChannelId = this.sendChannel.sessionId;
    this.recvChannel = new PageChannel('https://' + SERVER_NAME + '/channel/', clientChannelId);
    this.recvChannel.listen();

    this.recvChannel.onMessage((message) => {
      this.setState({
        items: this.state.items.concat([message])
      });
    });

    this.programStore = new ProgramStore('https://' + SERVER_NAME + '/program');
    this.programStore.onValue((programs) => {
      this.setState({programs});
    });

    window.addEventListener('resize', (evt) => this.handleResize())

    this.handleResize();
    this.sendChannel.sendStart();
  }

  handleResize() {
    let documentWidth = document.body.offsetWidth;
    let containerWidth = Math.min(960, documentWidth);
    this.setState({ containerWidth });
  }

  send(message) {
    this.sendChannel.send(message);
  }

  sendCall(fn, args, kwargs) {
    this.sendChannel.sendCall(fn, args, kwargs);
  }

  render() {
    let singleColumn = this.state.containerWidth < 960;
    let contentLeftWidth = singleColumn ? (this.state.containerWidth - 40) : 280;
    let contentMainWidth = singleColumn ? (this.state.containerWidth - 40) : (this.state.containerWidth - contentLeftWidth);

    return (
      <section style={styles.outer}>
        <Header containerWidth={this.state.containerWidth}/>
        <section style={Object.assign({width: this.state.containerWidth}, styles.container)}>

          { singleColumn ? null : (
            <section style={{width: contentLeftWidth}}>
              <h1 style={styles.programHeader}>Recent Programs</h1>
              <ProgramListing programs={this.state.programs} />
             </section>
            ) 
          }
          <section style={{width: contentMainWidth, margin: '0 auto'}}>
            <ProgramOutput
              items={this.state.items}
              send={(message) => this.send(message)}
              sendCall={(fn, args, kwargs) => this.sendCall(fn, args, kwargs)}
            />
          </section>

        </section>
        { singleColumn ? (
          <section style={{width: contentLeftWidth, margin: '0 auto'}}>
            <h1 style={styles.programHeader}>Recent Programs</h1>
            <ProgramListing programs={this.state.programs} />
           </section>
          ) : null
        }
      </section>
    );
  }
}


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
    margin: '20px auto',
    display: 'flex',
    flexDirection: 'row'
  }

};


ReadlineMain.defaultProps = {
  pageId: 'index'
};
