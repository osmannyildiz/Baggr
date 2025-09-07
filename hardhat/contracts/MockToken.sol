// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockToken is ERC20 {
    constructor(string memory symbol) ERC20(symbol, symbol) {
        _mint(msg.sender, 100 ether);
    }
}
