var RewardsEngine = artifacts.require("./RewardsEngine.sol");

module.exports = function(deployer) {
  //deployer.deploy(RewardsEngine, rToken.address, cTokens.address);
  deployer.deploy(RewardsEngine, "0xeA41aA8c30fcf7f29BdCE6E0eCd97248F17bd2b9", "0xCBef9084A9491c0874b8660F20a2e4b1633ED83E");
};
