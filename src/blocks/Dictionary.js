import React from 'react';
import Base from './Base';

let Dictionary = Base.createBlock('dictionary', {

  renderItem(key, value) {
    console.log(key, value);
    return (
        <section>
          <span className="dictKey">{key}: </span>
          <span className="dictValue">{value}</span>
        </section>
    );
  },

  // TODO: make expandable
  render() {
    return (
      <section className="dictionary">
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