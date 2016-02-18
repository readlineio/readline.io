import React from 'react';
import Base from './Base';

let Input = Base.createBlock('input', {

  getInitialState() {
    return {
      inputValue: ''
    };
  },

  handleChange(event) {
    this.setState({
      inputValue: event.target.value
    });
  },

  returnInput(value) {
    this.props.store.makeCall(this.props.item.callback, [this.state.inputValue]);
  },

  render() {
    return (
      <section className="block">
        <section>
          {this.props.item.prompt}
        </section>
        <section>
          <input onChange={this.handleChange} value={this.state.inputvalue}></input>
          <button onClick={this.returnInput}>Submit</button>
        </section>
      </section>
    );
  }

});

export default Input;