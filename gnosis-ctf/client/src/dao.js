import React, { Component } from "react";

class DAO extends Component {
  constructor(props) {
    super(props);
    const {engine,sysAdmin,reward,rewardsBank} = props;
    this.engine = engine;
    this.sysAdmin = sysAdmin;
    this.reward = reward;
    this.rewardsBank = rewardsBank;

    this.state = {value: 0};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    //alert('Minting rewards. Existing rewards in bank is: ' + this.state.value);
    (async function(reward, rewardsBank){
      var res = await reward.methods.balanceOf(rewardsBank).call();
      //this.state = {value: res};
      alert ("Token balance is (before mint) :" + res);
      return res;
    })(this.reward, this.rewardsBank);

    (async function(engine, sysAdmin){
      await engine.methods.mintRewardsForBank().send({ from: sysAdmin });
    })(this.engine, this.sysAdmin);

    (async function(reward, rewardsBank){
      var res = await reward.methods.balanceOf(rewardsBank).call();
      //this.state = {value: res};
      alert ("Token balance is :" + res);
      return res;
    })(this.reward, this.rewardsBank);

    //event.preventDefault();
  }

  render() {
    //if (!this.state.web3) {
    //  return <div>Loading Web3, accounts, and contract...</div>;
    //}
    return (
      <div className="DAO">
        <h1>HR</h1>
        <p>Mint reward tokens</p>
        <button onClick={this.handleClick}>Mint</button>
      </div>
    );
  }

}

export default DAO;
