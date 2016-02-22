import React from 'react';
import Base from './Base';

import {BaseStyles} from '../constants/Constants';

let Title = Base.createBlock('title', {

  render() {
    return (
      <section style={BaseStyles.largeText}>
        {this.props.item.text}
      </section>
    );
  }

});

export default Title;