// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.6.0;

//import { ERC20 } from "github.com/OpenZeppelin/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import { ERC20 } from "./openzeppelin-contracts/ERC20.sol";

contract RewardToken is ERC20 {
    constructor(string memory name, string memory symbol) public ERC20(name, symbol) {}
    
    function mint(address account, uint256 amount) external {
        _mint(account, amount);
    }
}
