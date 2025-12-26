// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarbonCredit is ERC20, Ownable {
    struct Project {
        address submitter;
        string name;
        uint256 credits;
        bool approved;
        string ipfsHash;
    }

    mapping(uint256 => Project) public projects;
    uint256 public projectCount;

    event ProjectSubmitted(uint256 projectId, address submitter, string name);
    event ProjectApproved(uint256 projectId, uint256 creditsMinted);
    event CreditsTransferred(address from, address to, uint256 amount);

    constructor() ERC20("Carbon Credit", "CC") {}

    function submitProject(string memory _name, uint256 _credits, string memory _ipfsHash) external {
        projectCount++;
        projects[projectCount] = Project(msg.sender, _name, _credits, false, _ipfsHash);
        emit ProjectSubmitted(projectCount, msg.sender, _name);
    }

    function approveProject(uint256 _projectId) external onlyOwner {
        require(_projectId <= projectCount, "Project does not exist");
        Project storage project = projects[_projectId];
        require(!project.approved, "Project already approved");

        project.approved = true;
        _mint(project.submitter, project.credits);
        emit ProjectApproved(_projectId, project.credits);
    }

    function transferCredits(address to, uint256 amount) external {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        _transfer(msg.sender, to, amount);
        emit CreditsTransferred(msg.sender, to, amount);
    }

    function retireCredits(uint256 amount) external {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        _burn(msg.sender, amount);
    }
}