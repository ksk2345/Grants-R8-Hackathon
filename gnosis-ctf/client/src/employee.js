import React, { Component } from "react";

class Employee extends Component {
  constructor(props) {
    super(props);
    const {engine} = props;
    this.engine = engine;

    this.state = {vacancyCode: '', candidateCode: '', rvacancyCode: '', rcandidateCode: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleReferCandidateClick = this.handleReferCandidateClick.bind(this);
    this.handleRedeemRewardsClick = this.handleRedeemRewardsClick.bind(this);
  }

  handleReferCandidateClick(event) {
    alert('Refer candidate clicked. vacancyCode is: ' + this.state.vacancyCode + ', candidateCode is: '+ this.state.candidateCode);
    event.preventDefault();
  }

  handleRedeemRewardsClick(event) {
    alert('Redeem rewards clicked. vacancyCode is: ' + this.state.rvacancyCode + ', candidateCode is: '+ this.state.rcandidateCode);
    event.preventDefault();
  }

  handleChange(event) {
    let newvalue = event.target.value;
    switch (event.target.name)
    {
      case 'vacancyCode' :
        this.setState(prev=>({vacancyCode: newvalue, candidateCode: prev.candidateCode, rvacancyCode: prev.rvacancyCode, rcandidateCode: prev.rcandidateCode}));
        break;
      case 'candidateCode' :
        this.setState(prev=>({vacancyCode: prev.vacancyCode, candidateCode: newvalue, rvacancyCode: prev.rvacancyCode, rcandidateCode: prev.rcandidateCode}));
        break;
      case 'rvacancyCode' :
        this.setState(prev=>({vacancyCode: prev.vacancyCode, candidateCode: prev.candidateCode, rvacancyCode: newvalue, rcandidateCode: prev.rcandidateCode}));
        break;
      case 'rcandidateCode' :
        this.setState(prev=>({vacancyCode: prev.vacancyCode, candidateCode: prev.candidateCode, rvacancyCode: prev.rvacancyCode, rcandidateCode: newvalue}));
        break;
      default:
    }
    //if(event.target.value === 'vacancyCode')
    //{
    //  this.setState(prev=>({vacancyCode: prev.vacancyCode, svacancyCode: prev.svacancyCode, scandidateCode: prev.scandidateCode}));
    //}
  }

  render() {
    //if (!this.state.web3) {
    //  return <div>Loading Web3, accounts, and contract...</div>;
    //}
    return (
      <div className="Employee">
        <h1>Employee</h1>
        <label>Reward balance : 0</label><br/>
        &nbsp;<br/>&nbsp;<br/>
        <p>Refer Candidate</p>
        <input type="text" placeholder="vacancyCode" name="vacancyCode" onChange={this.handleChange} /><br/>
        <input type="text" placeholder="candidateCode" name="candidateCode" onChange={this.handleChange} /><br/>
        <button onClick={this.handleReferCandidateClick}>Refer</button>
        &nbsp;<br/>&nbsp;<br/>

        <p>Redeem Rewards</p>
        <input type="text" placeholder="vacancyCode" name="rvacancyCode" onChange={this.handleChange} /><br/>
        <input type="text" placeholder="candidateCode" name="rcandidateCode" onChange={this.handleChange} /><br/>
        <button onClick={this.handleRedeemRewardsClick}>Redeem</button>

      </div>
    );
  }

}

export default Employee;