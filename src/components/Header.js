/*
 * @providesModule ReadlineMain
 */

'use strict';

import React from 'react';

export default (props) => (
  <section style={styles.outer}>
    <section style={Object.assign({width: props.containerWidth}, styles.header)}>
      <h2 style={styles.headerLogo}>Readline.io</h2>
    </section>
  </section>
);

const styles = {

  outer: {
    width: '100%',
    padding: '10px 0',
    backgroundColor: '#3D8B85',
    boxShadow: '0 1px 1px rgba(0,0,0,0.12), 0 1px 1px rgba(0,0,0,0.24)'
  },

  header: {
    margin: '0 auto',
    flexDirection: 'row',
    display: 'flex'
  },

  headerLogo: {
    color: 'white',
    textAlign: 'left',
    textTransform: 'uppercase',
    fontSize: 18,
    letterSpacing: 2,
    fontFamily: "Avenir",
    fontWeight: '400',
    margin: 0,
    padding: '0 20px'
  }

};
