// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CarbonCredit is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    struct Credit {
        uint256 projectId;
        uint256 amount; // in tons
        string certificateURI; // IPFS URI
        bool retired;
        address minter;
    }

    mapping(uint256 => Credit) public credits;
    mapping(uint256 => address) public projectVerifiers;

    event CreditMinted(uint256 indexed tokenId, uint256 projectId, uint256 amount, address minter);
    event CreditRetired(uint256 indexed tokenId, address retiree);
    event CreditTransferred(uint256 indexed tokenId, address from, address to);

    constructor() ERC721("CarbonCredit", "CCREDIT") {}

    function mintCredit(
        uint256 projectId,
        uint256 amount,
        string memory certificateURI,
        address to
    ) public onlyOwner returns (uint256) {
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();

        _mint(to, tokenId);
        credits[tokenId] = Credit({
            projectId: projectId,
            amount: amount,
            certificateURI: certificateURI,
            retired: false,
            minter: to
        });

        emit CreditMinted(tokenId, projectId, amount, to);
        return tokenId;
    }

    function retireCredit(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        require(!credits[tokenId].retired, "Already retired");

        credits[tokenId].retired = true;
        emit CreditRetired(tokenId, msg.sender);
    }

    function transferCredit(address to, uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        require(!credits[tokenId].retired, "Cannot transfer retired credit");

        _transfer(msg.sender, to, tokenId);
        emit CreditTransferred(tokenId, msg.sender, to);
    }

    function getCredit(uint256 tokenId) public view returns (Credit memory) {
        return credits[tokenId];
    }

    function isRetired(uint256 tokenId) public view returns (bool) {
        return credits[tokenId].retired;
    }
}