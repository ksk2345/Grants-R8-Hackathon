var SimpleStorage = artifacts.require("./SimpleStorage.sol");
//var CTHelpers = artifacts.require("./CTHelpers.sol");
var ConditionalTokens = artifacts.require("./ConditionalTokens.sol");
var RewardToken = artifacts.require("./RewardToken.sol");
var RewardsEngine = artifacts.require("./RewardsEngine.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);

  //deployer.deploy(RewardToken, "Reward Token", "Rt")
  //.then(function() { return deployer.deploy(ConditionalTokens);})
  //.then(function() { return deployer.deploy(RewardsEngine, RewardToken.address, ConidtionalTokens.address);})

  var rToken;
  var cTokens;

  deployer.deploy(ConditionalTokens)
  //.then(function() {
  //  return ConditionalTokens.new();
  //})
  .then((instance) => {
    cTokens = instance;
    console.log('address:' + instance.address);
  });

  deployer.deploy(RewardToken,"Reward Token", "Rt")
  //.then(function() {
  //  return RewardToken.new("Reward Token", "Rt");})
  .then((instance) => {
    rToken = instance;
    console.log('address:' + instance.address);
    //console.log('cTokens:'+cTokens);
  })
  ;

  //deployer.deploy(RewardsEngine, rToken.address, cTokens.address);
  //deployer.deploy(RewardsEngine, 0x8E75429F870a1bE5b546D75f18503e8a9f236C74, 0x5Eb7a514c1097f1AAEe0621C70dA7D59B996997B);

};
