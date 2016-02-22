import React from 'react';
import Base from './Base';

let Image = Base.createBlock('image', {

  render() {
    return (
      <section>
        <img style={{width: "100%"}} src={this.props.item.url}></img>
      </section>
    );
  }

});

export default Image;