// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CONTRAT_APPROVI is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    uint256 private _nextTokenId;
    uint public contractCount;
    
    struct Supply {
        string supplier;
        string materialName;
        string materialInfo;
        string imageHash; // Hash de l'image de la matière première
    }

    mapping(uint => Supply) public supplies;

    constructor(address initialOwner)
        ERC721("CONTRAT_APPROVI", "MTK")
        Ownable(initialOwner)
    { 
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // Fonction pour créer un nouveau contrat d'approvisionnement
    function createSupplyContract(string memory _supplier, string memory _materialName, string memory _materialInfo, string memory _imageHash) public returns (uint) {
        uint tokenId = contractCount;
        supplies[tokenId] = Supply(_supplier, _materialName, _materialInfo, _imageHash);
        _mint(msg.sender, tokenId);
        contractCount++;
        return tokenId;
    }

    // Fonction pour récupérer les détails d'un contrat d'approvisionnement
    function getSupplyDetails(uint tokenId) public view returns (string memory supplier, string memory materialName, string memory materialInfo, string memory imageHash) {
        Supply memory supply = supplies[tokenId];
        return (supply.supplier, supply.materialName, supply.materialInfo, supply.imageHash);
    }

    // Fonction pour échanger un fichier image pour un contrat d'approvisionnement donné
    function exchangeImage(uint tokenId, string memory newImageHash) public {
        require(ownerOf(tokenId) == msg.sender, "You are not the owner of this supply contract");
        supplies[tokenId].imageHash = newImageHash;
    }

    // Fonction d'override de tokenURI
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    // Fonction d'override de supportsInterface
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
