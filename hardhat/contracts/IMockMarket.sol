// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

interface IMockMarket {
    function tokenPrice(address token) external view returns (uint256 weiPerToken);

    function buy(address token) external payable;
    function sell(address token, uint256 tokensIn) external;

    function previewBuy(address token, uint256 ethInWei) external view returns (uint256 tokensOut);
    function previewSell(address token, uint256 tokensIn) external view returns (uint256 ethOutWei);

    function debug_ethBalance() external view returns (uint256 ethWei);
    function debug_tokenBalance(address token) external view returns (uint256 tokenUnits);
}
