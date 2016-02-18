import React from 'react';
import Base from './Base';

let Output = Base.createBlock('output', {

  render() {
    return (
      <section className="block">
        {this.props.item.text}
      </section>
    );
  }

});

Output.defaultProps = {
  text: 'No text'
};

export default Output;