// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { IMockMarket } from "./IMockMarket.sol";

contract MockMarket is IMockMarket {
    address public owner;

    mapping(address => uint256) public override tokenPrice;

    event Bought(address indexed user, uint256 ethIn, uint256 tokensOut);
    event Sold(address indexed user, uint256 tokensIn, uint256 ethOut);
    event PricesUpdated(uint256 buyPrice, uint256 sellPrice);
    event OwnerChanged(address indexed newOwner);

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {} // owner can preload ETH by sending value

    /* ---------- User: buy & sell ---------- */

    // Send ETH, receive tokens at buyPrice (tokens per 1 ETH)
    function buy(address token) external payable override {
        require(msg.value > 0, "no ETH");
        
        uint256 tokensOut = (msg.value * tokenPrice[address(token)]) / 1e18;
        require(tokensOut > 0, "dust");
        require(IERC20(token).balanceOf(address(this)) >= tokensOut, "insufficient token");

        // transfer tokens to user
        require(IERC20(token).transfer(msg.sender, tokensOut), "token transfer failed");

        emit Bought(msg.sender, msg.value, tokensOut);
        // ETH stays in the contract as liquidity
    }

    // Sell tokens for ETH at sellPrice (tokens per 1 ETH)
    function sell(address token, uint256 tokensIn) external override {
        require(tokensIn > 0, "no tokens");

        // pull tokens from user
        require(IERC20(token).transferFrom(msg.sender, address(this), tokensIn), "token transferFrom failed");

        // compute ETH out
        uint256 ethOut = (tokensIn * 1e18) / tokenPrice[address(token)];
        require(ethOut > 0, "dust");
        require(address(this).balance >= ethOut, "insufficient ETH");

        // pay ETH to user
        (bool ok, ) = payable(msg.sender).call{value: ethOut}("");
        require(ok, "ETH send failed");

        emit Sold(msg.sender, tokensIn, ethOut);
    }

    /* ---------- Admin ---------- */

    function setTokenPrice(address token, uint256 newPrice) external onlyOwner {
        require(token != address(0), "bad token");
        require(newPrice > 0, "bad price");
        tokenPrice[token] = newPrice;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "bad owner");
        owner = newOwner;
        emit OwnerChanged(newOwner);
    }

    // Simple withdrawals to move liquidity around (optional quality-of-life)
    function withdrawETH(address payable to, uint256 amount) external onlyOwner {
        (bool ok, ) = to.call{value: amount}("");
        require(ok, "withdraw ETH failed");
    }
    function withdrawToken(address token, address to, uint256 amount) external onlyOwner {
        require(IERC20(token).transfer(to, amount), "withdraw token failed");
    }

    /* ---------- Views ---------- */

    function previewBuy(address token, uint256 ethInWei) external view returns (uint256) {
        return (ethInWei * tokenPrice[address(token)]) / 1e18;
    }

    function previewSell(address token, uint256 tokensIn) external view returns (uint256) {
        return (tokensIn * 1e18) / tokenPrice[address(token)];
    }

    /* ---------- Debug ---------- */

    function debug_ethBalance() external view override returns (uint256 ethWei) {
        return address(this).balance;
    }

    function debug_tokenBalance(address token) external view override returns (uint256 tokenUnits) {
        return IERC20(token).balanceOf(address(this));
    }
}
