import React from 'react';
import Base from './Base';

let Choice = Base.createBlock('choice', {

  returnInput(value) {
    this.props.sendCall(this.props.item.callback, [value]);
  },

  render() {
    return (
      <section className="block">
        <section>
          {this.props.item.prompt}
        </section>
        <button onClick={() => {this.returnInput("Yes")}}>Yes</button>
        <button onClick={() => {this.returnInput("No")}}>No</button>
      </section>
    );
  }

});

export default Choice;