import React from 'react';
import Base from './Base';

let Dictionary = Base.createBlock('dictionary', {

  renderItem(key, value) {
    console.log(key, value);
    return (
        <section>
          <span>{key}: </span>
          <span>{value}</span>
        </section>
    );
  },

  // TODO: make expandable
  render() {
    return (
      <section>
        {
          Object.keys(this.props.item.object).map((key) => {
            return this.renderItem(key, this.props.item.object[key]);
          })
        }
      </section>
    );
  }

});

Dictionary.defaultProps = {
  item: {}
};

export default Dictionary;