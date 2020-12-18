var RewardsEngine = artifacts.require("./RewardsEngine.sol");
var ConditionalTokens = artifacts.require("./ConditionalTokens.sol");
var RewardToken = artifacts.require("./RewardToken.sol");

module.exports = function(deployer) {
  //console.log('ConditionalTokens ' + ConditionalTokens.address);
  //console.log('RewardToken ' + RewardToken.address);

  //deployer.deploy(RewardsEngine, rToken.address, cTokens.address);
  
  deployer.deploy(RewardsEngine, RewardToken.address, ConditionalTokens.address);
};
