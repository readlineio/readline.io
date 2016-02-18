import React from 'react';

let baseOptions = {

}

let Base = {
  createBlock(name, options) {
    let factory = React.createClass(
      Object.assign({}, baseOptions, options)
    );
    Base.blockRegistry[name] = factory;
    return factory;
  }
}

Base.blockRegistry = {};

export default Base;