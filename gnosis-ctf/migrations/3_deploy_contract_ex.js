var RewardsEngine = artifacts.require("./RewardsEngine.sol");

module.exports = function(deployer) {
  //deployer.deploy(RewardsEngine, rToken.address, cTokens.address);
  deployer.deploy(RewardsEngine, "0x2850eA2599E5d68e53aC3d6B3fe1A67B7cd657Ad", "0x2Fd724d4C7A14f86e0002257d6009d2a17678a3C");
};
