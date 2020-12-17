// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.6.0;

import { RewardToken } from "./RewardToken.sol";
import { ConditionalTokens } from "./ConditionalTokens.sol";

//import { IERC20 } from "github.com/OpenZeppelin/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
//import { ERC1155Receiver } from "github.com/OpenZeppelin/openzeppelin-contracts/contracts/token/ERC1155/ERC1155Receiver.sol";
import { IERC20 } from "./openzeppelin-contracts/IERC20.sol";
import { ERC1155Receiver } from "./openzeppelin-contracts/ERC1155Receiver.sol";

//import { IERC20 } from "./IERC20.sol";
//import { IERC1155 } from "github.com/OpenZeppelin/openzeppelin-contracts/contracts/token/ERC1155/IERC1155.sol";
//import { IConditionalTokens } from "./IConditionalTokens.sol";

/**
 * @title RewardEngine
 * @dev Process Rewards
 */
contract RewardsEngine is ERC1155Receiver {
    IERC20 _rewardToken;
    RewardToken _rewardTokenMint;
    ConditionalTokens _conditionalTokens;
    address private _oracleAcctId;
    address private _rewardsBankAcctId;
    bytes32 private _parentCollectionId = 0x0000000000000000000000000000000000000000000000000000000000000000;
    
    constructor(
        address rewardToken,
        address conditionalTokens
        //address oracle,
        //address bank
    ) public {
        _rewardToken = IERC20(rewardToken);
        _rewardTokenMint = RewardToken(rewardToken);
        _conditionalTokens = ConditionalTokens(conditionalTokens);
        //_oracleAcctId = oracle;
        //_rewardsBankAcctId = bank;
    }

    //// SysAdmin functions
    
    function setOracle(address acctId) external
    {
        _oracleAcctId = acctId;
    }
    
    function setRewardsBank(address acctId) external
    {
        _rewardsBankAcctId = acctId;
    }

    function mintRewardsForBank() external
    {
        // system mints enough RewardToken to RewardBank
        // To limit unlimited token flow, it can hold a maximum of 1000 amount
        
        uint256 balance = _rewardToken.balanceOf(_rewardsBankAcctId);
        
        uint256 gap = 1000 - balance;
        
        // TRANSACTION code
        _rewardTokenMint.mint(_rewardsBankAcctId, gap);
    }
    
    //// HR functions
    
    //2. OpenVacancy(vacancyId, rewardAmount, vacancyCount=1)
    // desc: HR opens a Vacancy and approves some RewardToken
    


    function openVacancy(bytes8 vacancyCode, uint256 rewardAmount) external 
    {
        //console.log(vacancyCode);
        // assuming vacancyCount as 1
        
        //require (msg.sender == owner);
        // TRANSACTION code - Approve the reward, for the Vacancy
        _rewardToken.approve(address(_conditionalTokens), rewardAmount);
        //_rewardToken.increaseAllowance(address(_conditionalTokens), rewardAmount);
        
    }
    
    function getCandidates(bytes8 vacancyCode) external 
    {
        
    }
    
    function shortlistCandidate(bytes8 vacancyCode, bytes8 candidateCode) external 
    {
        uint256 outcomeSlotCount;
        outcomeSlotCount = 2; // No, Yes [1,2]
        
        uint256[] memory partitions = new uint256[](2);
        partitions[0] = 1;  // No, Yes [1,2]
        partitions[1] = 2;  // No, Yes [1,2]
        
        // 1.
        // let's skip Milestone-1 of 'Refer & Shortlist' condition, rewards 5%
        
        // 2.
        // Milestone-2 of 'Candidate Joins' condition, rewards of 50 %
        uint256 rewardAmount2 = 50;
        
        // questionId = generate unique byte32 based on (vacancyCode and candidateCode)
        bytes32 questionId2;
        questionId2 = vacancyCode<<24 | candidateCode<<16 | 0x0000000000000000;
        
        // Prepare the condition (transaction)
        // TRANSACTION code
        _conditionalTokens.prepareCondition(_oracleAcctId, questionId2, outcomeSlotCount);
        
        bytes32 conditionId2;
        conditionId2 = _conditionalTokens.getConditionId(_oracleAcctId, questionId2, outcomeSlotCount);
        
        // Split the position
        // TRANSACTION code
        _conditionalTokens.splitPosition(_rewardToken, _parentCollectionId, conditionId2, partitions, rewardAmount2);
        
        // 3.
        // Milestone-3 of 'Candidate Completes 1 year' condition, rewards of 50%
        uint256 rewardAmount3 = 50;
        
        // questionId = generate unique byte32 based on (vacancyCode and candidateCode)
        bytes32 questionId3;
        questionId3 = vacancyCode<<24 | candidateCode<<16 | 0x0000000000000001;
        
        // Prepare the condition (transaction)
        // TRANSACTION code
        _conditionalTokens.prepareCondition(_oracleAcctId, questionId3, outcomeSlotCount);
        
        bytes32 conditionId3;
        conditionId3 = _conditionalTokens.getConditionId(_oracleAcctId, questionId3, outcomeSlotCount);
        
        // Split the position
        // TRANSACTION code
        _conditionalTokens.splitPosition(_rewardToken, _parentCollectionId, conditionId3, partitions, rewardAmount3);
        
        
    }
    
    
    function closeVacancy(bytes8 vacancyCode) external 
    {
        
    }
    
    
    
    //// Employee functions
    
    function getVacancies() external
    {
        
    }
    
    
    function referCandidate(bytes8 vacancyCode, bytes8 candidateCode) external
    {
        
    }
    
    function redeemRewards(bytes8 vacancyCode, bytes8 candidateCode) external
    {
        bytes32 questionId;
        questionId = vacancyCode<<24 | candidateCode<<16 | 0x0000000000000001;
        
        // No, Yes [1,2]
        uint256[] memory indexSets = new uint256[](1);
        indexSets[0] = 2;

        _conditionalTokens.redeemPositions(_rewardToken, _parentCollectionId, questionId, indexSets);
    }
    
    
    //// Oracle functions
    function candidateJoins (bytes8 vacancyCode, bytes8 candidateCode) external
    {
        bytes32 questionId;
        questionId = vacancyCode<<24 | candidateCode<<16 | 0x0;
        
        // No, Yes [1,2]
        uint256[] memory payouts = new uint256[](2);
        payouts[0] = 0;  
        payouts[1] = 1;

        _conditionalTokens.reportPayouts(questionId, payouts);
    }
    
    function candidateCompletes1Year (bytes8 vacancyCode, bytes8 candidateCode) external
    {
        bytes32 questionId;
        questionId = vacancyCode<<24 | candidateCode<<16 | 0x0000000000000001;
        
        // No, Yes [1,2]
        uint256[] memory payouts = new uint256[](2);
        payouts[0] = 0;  
        payouts[1] = 1;

        _conditionalTokens.reportPayouts(questionId, payouts);
    }
    

    //// ERC1155Received interface implementations
    
    function onERC1155Received(address operator,address from,uint256 id,uint256 value,bytes calldata data) override external returns(bytes4)
    {
        return this.onERC1155Received.selector;
    }
    
    function onERC1155BatchReceived(address operator, address from, uint256[] calldata ids, uint256[] calldata values, bytes calldata data) override external returns(bytes4)
    {
        return this.onERC1155BatchReceived.selector;
    }
    
}

/*

Entities
name: RewardBank, type: account, desc: An infinite source of RewardTokens (multisig?)
name: HR(Oracle), type: account
name: RewardToken, type: ERC20
name: Employee, type: account
name: Candidate, type: notdefined

*/
