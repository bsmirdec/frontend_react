# CobApp

Définissons ici l'architecture et les principales fonctionnalités attendues pour l'interface Web de l'application CobApp

---
## Pages principales
---
L'application comportera un certains nombre de pages principales, correspondant aux fonctionnalités majeures :
- **Home** : page ou on trouvera les dernières infos de l'entreprise, le mot du patron, les diffusions QSE

- **Bannière** : la bannière devra contenir les liens vers les diverses pages, et être affichée systématiquement. Elle contiendra aussi un menu utilisateur et une icone de notifications.

- **Chantier** : page à destination de l'encadrement de chantier principalement, où l'on pourra visualiser et gérer les infos du chantier, le stock du chantier, le personnel, ...

- **Commande** : page à destination des chef de chantier et conduc Tvx, pour commander du matériel. Son architecture sera semblable à un site de commande en ligne, avec un catalogue, un système de filtrage, un panier, et une validation de panier (commande). Cette page doit inclure un système de validation.

- **Administration** : équivalent de l'administration de l'API mais disponible sur l'application web

- **Statistiques** : pages à destination des patrons et salariés du siège, comprenant graphiques dynamiques et statistiques sur l'ensemble des chantiers

- **Pied de page** : permettant d'accéder aux contacts et de faire des commentaires, ou de signaler des bugs


---
## Version Mobile
---
La version mobile de l'application sera une version simplifiée, voire très simplifiée de l'application, sur laquelle nous garderons uniquement les interfaces de commande, réception et affichage du matériel du chantier.


---
## Chantier
---
La page chantier est articulée comme un dashboard de gestion de projet.
On choisit d'abord le chantier que l'on veut afficher sur le menu de gauche, puis on est dirigé vers l'affichage des informations du chantier. 


### Stock
---
Le stock du chantier devra être affiché ici, trié par type de matériel (coffrage, machines, outillage, équipement de sécurité, consommables, ...)

On pourra voir les arrivées et sorties de matériel au fûr et à mesure des commandes, ainsi que voir les prochains arrivages programmés

Il y aura un lien vers la page de commande pour faire une nouvelle demande.

A voir si utile, nous pourrions également afficher un bouton qui permettrait d'ajouter les éléments du stock chantier à une liste et de faire une demande de retour.


### Bennes
---
La gestion des bennes devra apparaître ici, avec la possibilité de demander un retrait ou un dépôt.


### Personnel
---
A venir, pointage du personnel

### QSE
---
A venir, interface QSE pour réaliser les 1/4h et visites sécurité


