/*
 * @providesModule ProgramOutput
 */

'use strict';

import React from 'react';
import {PageChannel} from '../helpers/Channel';
import {BaseStyles} from '../constants/Constants';
import Header from '../components/Header';
import Base from '../blocks/Base';
import blockRegistry from '../blocks/blockRegistry';


const ItemDefault = (props) => (
  <h2>{props.item}</h2>
);


const Item = (props) => {
  let Factory = Base.blockRegistry[props.item.type];
  if (!Factory) {
    console.warn("Invalid block type:", props.item.type);
    return (
      <ItemDefault
        item={props.item}
      />
    );
  } else {
    return (
      <Factory
        item={props.item}
        send={props.send}
        sendCall={props.sendCall}
      />
    );
  }
}


const ProgramOutput = (props) => (
  <section>
    { props.items.map((item, index) => (
      <section key={index} style={Object.assign({}, styles.item, BaseStyles.card)}>
        <Item
          item={item}
          key={index}
          send={props.send}
          sendCall={props.sendCall}
        />
      </section>
    ))}
  </section>
);


let styles = {
  item: {
    padding: 20,
    marginBottom: 10
  }
};


export default ProgramOutput;