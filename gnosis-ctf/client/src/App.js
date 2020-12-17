import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import RewardsEngine from "./contracts/RewardsEngine.json";
import RewardToken from "./contracts/RewardToken.json";
import getWeb3 from "./getWeb3";

import "./App.css";
import Home from "./home.js"
import DAO from "./dao.js"
import HR from "./hr.js"
import Employee from "./employee.js"
import Oracle from "./oracle.js"

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      const deployedNetworkE = RewardsEngine.networks[networkId];
      const engine = new web3.eth.Contract(
        RewardsEngine.abi,
        deployedNetworkE && deployedNetworkE.address,
      );

      const deployedNetworkRT = RewardToken.networks[networkId];
      const reward = new web3.eth.Contract(
        RewardToken.abi,
        deployedNetworkRT && deployedNetworkRT.address,
      );
      /*
      Role assumptions
      accounts[0] : System Admin
      accounts[1] : Oracle
      accounts[2] : HR
      accounts[3] : Employee
      rewardsBank = RewardsEngined deployed address
      */

      const sysAdmin = accounts[0];
      const oracle = accounts[1];
      const hr = accounts[2];
      const employee = accounts[3];
      const rewardsBank = deployedNetworkE.address;

      await engine.methods.setOracle(oracle).send({ from: sysAdmin });
      await engine.methods.setRewardsBank(rewardsBank).send({ from: sysAdmin });

      //var response1 = await reward.methods.balanceOf(accounts[0]).call();
      //var response2 = await reward.methods.balanceOf(rewardsBank).call();
      //alert(response1 + ',' + response2);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance, engine: engine, reward: reward, rewardsBank: rewardsBank, sysAdmin: sysAdmin, oracle: oracle, hr: hr, employee: employee  }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract, engine } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
      <div className="App">
        &nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>
        &nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>
        <h1>Gnosis CTF dApp!</h1>
        <Home />
        &nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>
        &nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>
        <hr width="50%"/>
        &nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>
        &nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>
        &nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>
        <DAO engine={this.state.engine} sysAdmin={this.state.sysAdmin} reward={this.state.reward} rewardsBank={this.state.rewardsBank}/>
        <HR engine={this.state.engine} hr={this.state.hr}/>
        <hr width="50%"/>
        &nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>
        &nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>
        &nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>
        <Employee engine={this.state.engine}/>
        <hr width="50%"/>
        &nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>
        &nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>
        &nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>
        <Oracle engine={this.state.engine} oracle={this.state.oracle}/>
        <hr/>
        &nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>
        &nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>
      </div>
    );
  }
}

export default App;
