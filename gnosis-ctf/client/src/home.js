import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your role is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    //if (!this.state.web3) {
    //  return <div>Loading Web3, accounts, and contract...</div>;
    //}
    return (
      <div className="Home">
        <p>Choose your role</p>
        <form onSubmit={this.handleSubmit}>
          <select value={this.state.value} onChange={this.handleChange}>
          <option value="">-Select-</option>
          <option value="oracle">Oracle</option>
          <option value="hr">HR</option>
          <option value="Employee">Employee</option>
          </select>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }

}

export default Home;