import React from 'react';
import Base from './Base';

let Title = Base.createBlock('title', {

  render() {
    return (
      <section className="block large-text">
        {this.props.item.text}
      </section>
    );
  }

});

export default Title;