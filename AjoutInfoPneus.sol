// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TireTraceability {
    struct ProductionStep {
        uint timestamp;
        string description;
        address participant;
    }

    enum ProductionStage {RawMaterial, Manufacturing, Testing, Packaging, Complete}

    mapping(uint => ProductionStep[]) public productionSteps;
    mapping(uint => address) public tireOwners;

    // Fonction pour enregistrer une étape de production
    function recordProductionStep(uint tireId, string memory description, ProductionStage stage) public {
        require(tireOwners[tireId] != address(0), "Tire does not exist");
        require(msg.sender == tireOwners[tireId], "Only tire owner can record production step");

        productionSteps[tireId].push(ProductionStep(block.timestamp, description, msg.sender));

        if (stage == ProductionStage.Complete) {
            tireOwners[tireId] = address(0); // Réinitialiser le propriétaire du pneu une fois la production terminée
        }
    }

    // Fonction pour attribuer un pneu à un participant
    // Une liste departicipant, les testeurs
    function assignTire(uint tireId, address participant) public {
        require(tireOwners[tireId] == address(0), "Tire already assigned");
        tireOwners[tireId] = participant;
    }

}
