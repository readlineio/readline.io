/*
 * @providesModule ReadlineMain
 */

'use strict';

import React from 'react';
import {PageChannel} from '../helpers/Channel';
import Base from '../blocks/Base';
import blockRegistry from '../blocks/blockRegistry';


export default class ReadlineMain extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    this.channel = new PageChannel('http://readline.io/channel/', this.props.pageId);
    this.channel.onMessage((message) => {
      console.log('Appending message:', message);
      this.setState({
        items: items.concat([message])
      });
    });
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
        <Factory item={item} store={this.store} />
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
