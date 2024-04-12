// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^4.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PermitUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract PaymentContract is Initializable, ERC20Upgradeable, ERC20BurnableUpgradeable, OwnableUpgradeable, ERC20PermitUpgradeable {
    string private constant API_URL = "https://mon_api/verifier_fournisseur";

    mapping(address => bool) public verifiedAddresses;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address initialOwner) initializer public {
        __ERC20_init("PaymentContract", "MTK");
        __ERC20Burnable_init();
        __Ownable_init(initialOwner);
        __ERC20Permit_init("PaymentContract");

        _mint(msg.sender, 10 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        // verification de l'adresse avant de minter
        if (verifyAddress(to)){
             _mint(to, amount); // si verifier envoyer le montant exact
        } else {
         //rien faire 
         
        }
       
    }

    // Fonction pour vérifier l'adresse via l'API
    function verifyAddress(address addr) internal view returns (bool) {
        
        return true;
    }

    // Fonction pour ajouter une adresse vérifiée
    function addVerifiedAddress(address addr) public onlyOwner {
        require(verifyAddress(addr), "Address verification failed");
        verifiedAddresses[addr] = true;
    }

    // Fonction de transfert avec vérification de l'adresse vérifiée
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        require(verifiedAddresses[recipient], "Recipient address is not verified");
        return super.transfer(recipient, amount);
    }

    // Fonction de transfert depuis avec vérification de l'adresse vérifiée
    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        require(verifiedAddresses[recipient], "Recipient address is not verified");
        return super.transferFrom(sender, recipient, amount);
    }
}
