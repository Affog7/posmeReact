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

## 3. Programmation blockchain
    * Choix de la blockchain
        - B2B entre le fabricant de pneus et le fournisseurs
        - B2C entre le fabricant et les clients
        
## 4. Design blockchain
        - B2B entre le fabricant de pneus et le fournisseurs sur un contrat qui déclenche le versement des fonds après livraisons des matières premières
        - B2C entre le fabricant et les clients avec un smart contrat qui fournir des informations à partir de l'approvisionnement jusqu'au la fabrication du pneus.

## 5. Code / avancement

## 6. Livrables
