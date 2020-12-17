import React, { Component } from "react";

class HR extends Component {
  constructor(props) {
    super(props);
    const {engine, hr} = props;
    this.engine = engine;
    this.hr = hr;

    this.state = {vacancyCode: '',rewardAmount: 0, svacancyCode: '', scandidateCode: ''};

    this.handleNewVacancyClick = this.handleNewVacancyClick.bind(this);
    this.handleShortlistClick = this.handleShortlistClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleNewVacancyClick(event) {
    alert('Creating New Vacancy. New vacancy code is: ' + this.state.vacancyCode + ', Reward amount is: ' + this.state.rewardAmount);

    (async function(engine, hr, vacancyCode, rewardAmount){
      await engine.methods.openVacancy(vacancyCode, rewardAmount).send({ from: hr });
    })(this.engine, this.hr, this.state.vacancyCode, this.state.rewardAmount);
    
    alert('New Vacancy created.');

    //event.preventDefault();
  }

  handleShortlistClick(event) {
    alert('Shortlisting Candidate. Vacancy code is: ' + this.state.svacancyCode + ', Candidate code is: '+ this.state.scandidateCode);

    (async function(engine, hr, svacancyCode, scandidateCode){
      try {
        await engine.methods.shortlistCandidate(svacancyCode, scandidateCode).send({ from: hr });
      }catch(error)
      {
        //alert(error);
      }
    })(this.engine, this.hr, this.state.svacancyCode, this.state.scandidateCode);

    alert('Shortlist completed.');

    //event.preventDefault();
  }

  handleChange(event) {
    let newvalue = event.target.value;
    switch (event.target.name)
    {
      case 'vacancyCode' :
        this.setState(prev=>({vacancyCode: newvalue, rewardAmount: prev.rewardAmount, svacancyCode: prev.svacancyCode, scandidateCode: prev.scandidateCode}));
        break;
      case 'rewardAmount' :
        this.setState(prev=>({vacancyCode: prev.vacancyCode, rewardAmount: newvalue, svacancyCode: prev.svacancyCode, scandidateCode: prev.scandidateCode}));
        break;
      case 'svacancyCode' :
        this.setState(prev=>({vacancyCode: prev.vacancyCode, rewardAmount: prev.rewardAmount, svacancyCode: newvalue, scandidateCode: prev.scandidateCode}));
        break;
      case 'scandidateCode' :
        this.setState(prev=>({vacancyCode: prev.vacancyCode, rewardAmount: prev.rewardAmount, svacancyCode: prev.svacancyCode, scandidateCode: newvalue}));
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
      <div className="HR">
        &nbsp;<br/>&nbsp;<br/>
        <p>New Vacancy</p>
        <input type="text" placeholder="Enter vacancy code" name="vacancyCode" onChange={this.handleChange} /><br/>
        <input type="text" placeholder="Enter reward amount" name="rewardAmount" onChange={this.handleChange} /><br/>
        <button onClick={this.handleNewVacancyClick}>New Vacancy</button>
        &nbsp;<br/>&nbsp;<br/>
        <p>Shortlist Candidate</p>
        <input type="text" placeholder="Enter vacancy code" name="svacancyCode" onChange={this.handleChange} /><br/>
        <input type="text" placeholder="Enter candidate code" name="scandidateCode" onChange={this.handleChange} /><br/>
        <button onClick={this.handleShortlistClick}>Shortlist</button>
      </div>
    );
  }

}

export default HR;