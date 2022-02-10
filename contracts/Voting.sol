// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Voting {
    address owner;
    mapping(address => bool) public voters;
    struct candidate {
        string name;
        string party;
        uint256 age;
        uint256 votes;
    }
    candidate[] public newCandidates;

    constructor() {
        owner = msg.sender;
    }

    modifier ownerOnly() {
        require(msg.sender == owner);
        _;
    }

    modifier check_voter() {
        require(!voters[msg.sender]);
        _;
    }

    function addVoters() public check_voter {
        voters[msg.sender] = true;
    }

    function addCandidate(
        string memory _name,
        uint256 _age,
        string memory _party
    ) public ownerOnly {
        candidate memory nCandidate = candidate({
            name: _name,
            party: _party,
            age: _age,
            votes: 0
        });
        newCandidates.push(nCandidate);
    }

    function vote(uint256 index) public check_voter {
        newCandidates[index].votes += 1;
    }
}
