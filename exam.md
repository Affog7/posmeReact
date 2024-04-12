## 0. Contexte 
La traçabilité des pneus.
## 0.1. Objectif
Utiliser de la blockchain pour facilité la vérification de la provenance des pneus, leur source (fabricant), et les informaions liées à la fabrication afin de garantie l'originanité des pneus et la confiance des acheteurs.
## 1. Analyse du contexte 
La traçabilité des pneus est une préccupation qui nécessite la receuille des données de fabrication des pneus, tous les process de la matière première au produit final.
Durant la conception des pneus plusieurs acteurs interviennent, les fournisseurs de matières premières, les fournisseurs de caochoucs par exemple, les transformations dans les usines, les testeurs. La majorité des données liées à la fabrication des pneus sont accessibles publiquement sauf les differentes formules de prépartion et les techniques utilisées pour les produits. 

* Contraintes :
  - Smart Contract
  - Privacy
  - Data Storage
* Résultats attendus:
  - En utilisant la blockchain, chaque étape de la fabrication des pneus peut être enregistrée de manière transparente et immuable, ce qui permet une traçabilité précise depuis les matières premières jusqu'au produit final. Cela peut renforcer la confiance des clients et garantir la qualité.

  - Sécurité et confidentialité : Les données enregistrées sur la blockchain sont cryptées et sécurisées, réduisant ainsi les risques de fraude ou de piratage. De plus, les informations sensibles peuvent être partagées de manière sélective avec les partenaires autorisés, garantissant ainsi la confidentialité.

  - Différenciation concurrentielle : En adoptant une technologie innovante comme la blockchain, votre société de conception de pneus peut se démarquer de la concurrence en démontrant son engagement envers la transparence, la qualité et l'innovation technologique.

## 2. Modélisation
- Participants
   1. Fournisseurs de matières première
   2. Fabricant de pneus
   3. Clients ou Acheteurs
- Assets : Les Pneus
  
- Transactions et règle business
  1. Transaction entre le fournisseur de matières premières et le fabricant de pneus par un contract intelligent base sur les NFTs. <br/>
      Explication : Des fichiers images seront fournis par les fournisseurs sur l'originaliné des matières ainsi que leur source. Un contrat d'approvisionnement sera donc utilisé
  2. Contract de tracabilité : ce contrat est utilisé pour enregistrer les differentes proccess de la fabrication des pneus
  3. Contract de transaction de fond entre les fournisseurs et le fabricant

## 3. Programmation blockchain.
* Choix de la blockchain
    - B2B entre le fabricant de pneus et le fournisseurs
    - B2C entre le fabricant et les clients
        
## 4. Design blockchain 
- B2B entre le fabricant de pneus et le fournisseurs sur un contrat qui déclenche le versement des fonds après livraisons des matières premières
- B2C entre le fabricant et les clients avec un smart contrat qui fournir des informations à partir de l'approvisionnement jusqu'au la fabrication du pneus.
- Exemple de structure d'implémentation
````lua
-- Fabricant de pneus
fabricant = {
    nom = "Fabricant de pneus",
    adresse = "0x123...",
    -- Autres données pertinentes
}

-- Fournisseur de matières premières
fournisseur = {
    nom = "Fournisseur de matières premières",
    adresse = "0x456...",
    -- Autres données pertinentes
}

 

-- Contrat de Transaction
contratTransaction = {
    -- Implémentez les détails du contrat de transaction
}

-- Contrat de Traçabilité
contratTraçabilité = {
    -- Implémentez les détails du contrat de traçabilité
}

-- Contrats d'approvisionnement avec NFT
contratsApprovisionnement = {
    -- Implémentez les détails des contrats d'approvisionnement
}

 
````
## 5. Code / avancement et Livrables

### Contract NFT d'approvisionnement
voir : <a href="https://github.com/Affog7/posmeReact/tree/master/contract_approvi.sol"> Contract Approvisionnement</a> <br/>
Livrable adresse de déploiement du contract :  0x79d8ba43974fb87b2fc9d8318cd80f827cd05af7
--> voir : <a href="https://holesky.beaconcha.in/tx/0x6ddf3aaec4803d9449278fea7ad5e1b01a02a5d939658c60d4bfdc99d1bdb0f9"> Lien </a>

### Contract de transaction de fond entre les fournisseurs et le fabricant
voir : <a href="https://github.com/Affog7/posmeReact/blob/master/TransactionContract.sol"> Paiement Contract</a> <br/>
Livrable adresse de déploiement :  0x3e0fccc953aad425142d880f90c2e00ff0e61572
--> voir : <a href="https://holesky.beaconcha.in/tx/0xb8214d7aba59a8c7a871f8ff0447b6d13120e51cd2e6e83c10bccb022af0de77"> Lien </a>

### Contract Traçabilité dureant les process de fabrication
voir : <a href="https://github.com/Affog7/posmeReact/tree/master/TracabilitePneus.sol"> Contract Approvisionnement</a> <br/>
Livrable adresse de déploiement du contract :  0x987c1c788eb636965fddf0989dd252e83298dab6
--> voir : <a href="https://holesky.beaconcha.in/tx/0x498f7e3f0728bc19d8afbe783d3a1b5e0d114e4cec1a653ee00ef54d5c71a693"> Lien </a>



## CONCLUSION
Enfin pour convaincre le directeur voici quelques avantages de mon poc : <br/>
Traçabilité améliorée : En utilisant la blockchain, chaque étape de la fabrication des pneus peut être enregistrée de manière transparente et immuable, ce qui permet une traçabilité précise depuis les matières premières jusqu'au produit final. Cela peut renforcer la confiance des clients et garantir la qualité.
Ainsi les clients depuis leur terminal peut récupérer des données vraies sur la fabrication des pneus. Généralement via une application qui utilise le web3.js un technologie pour communiquer avec la blockchain.
Sécurité et confidentialité : Les données enregistrées sur la blockchain sont cryptées et sécurisées, réduisant ainsi les risques de fraude ou de piratage. De plus, les informations sensibles peuvent être partagées de manière sélective avec les partenaires autorisés, garantissant ainsi la confidentialité.

Différenciation concurrentielle : En adoptant une technologie innovante comme la blockchain, la société peut se démarquer de la concurrence en démontrant son engagement envers la transparence, la qualité et l'innovation technologique.

## Sources : Bing, Google, Connaissance Personnelles, Github
