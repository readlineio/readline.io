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
    this.props.sendCall(this.props.item.callback, [this.state.inputValue]);
  },

  render() {
    return (
      <section>
        <section>
          {this.props.item.prompt}
        </section>
        <section>
          <form onSubmit={(evt) => {evt.preventDefault(); return false;}}>
            <input onChange={this.handleChange} value={this.state.inputvalue}></input>
            <button onClick={this.returnInput}>Submit</button>
          </form>
        </section>
      </section>
    );
  }

});

export default Input;