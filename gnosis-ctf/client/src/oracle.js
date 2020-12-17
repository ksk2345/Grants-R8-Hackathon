import React, { Component } from "react";

class Oracle extends Component {
  constructor(props) {
    super(props);
    const {engine, oracle} = props;
    this.engine = engine;
    this.oracle = oracle;

    this.state = {vacancyCode: '', candidateCode: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleCandidateJoinsClick = this.handleCandidateJoinsClick.bind(this);
  }

  handleCandidateJoinsClick(event) {
    alert('Candidate Joins for Vacancy code: ' + this.state.vacancyCode + ', Candidate code '+ this.state.candidateCode);

    (async function(engine, oracle, vacancyCode, candidateCode){
      await engine.methods.candidateJoins(vacancyCode, candidateCode).send({ from: oracle });
    })(this.engine, this.oracle, this.state.vacancyCode, this.state.candidateCode);

    alert('Candidate Joins completed');
    event.preventDefault();
  }

  handleChange(event) {
    let newvalue = event.target.value;
    switch (event.target.name)
    {
      case 'vacancyCode' :
        this.setState(prev=>({vacancyCode: newvalue, candidateCode: prev.candidateCode}));
        break;
      case 'candidateCode' :
        this.setState(prev=>({vacancyCode: prev.vacancyCode, candidateCode: newvalue}));
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
      <div className="Oracle">
        <h1>Oracle</h1>

        <p>Candidate Joins the companry</p>
        <input type="text" placeholder="vacancyCode" name="vacancyCode" onChange={this.handleChange} /><br/>
        <input type="text" placeholder="candidateCode" name="candidateCode" onChange={this.handleChange} /><br/>
        <button onClick={this.handleCandidateJoinsClick}>Joins</button>
        &nbsp;<br/>&nbsp;<br/>
        <p>Candidate Completes 1 year in company</p>
        <input type="text" placeholder="vacancyCode" name="vacancyCode" onChange={this.handleChange} /><br/>
        <input type="text" placeholder="candidateCode" name="candidateCode" onChange={this.handleChange} /><br/>
        <button onClick={this.handleCandidateCompletes1YearClick}>Completes</button>
        &nbsp;<br/>&nbsp;<br/>
      </div>
    );
  }

}

export default Oracle;