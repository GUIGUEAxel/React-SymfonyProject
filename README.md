# Event Manager Client - React avec Vite

## Description
L'application Event Manager Client est une application frontend d'affichage et de gestion d'artistes et d'événements, développée avec **React** et **Vite.js**. Elle permet d'afficher une liste d'artistes et d'événements, ainsi que leurs détails respectifs.

## Fonctionnalités
### 1. Navigation
- L'application est composée de **4 pages** :
  - Listing des artistes
  - Détails d'un artiste
  - Listing des événements
  - Détails d'un événement
- Une barre de navigation permet de passer d'une page à l'autre.

### 2. Listing des artistes
- Affiche une liste des artistes.
- Champ texte pour filtrer les artistes **par nom** (filtrage dynamique côté client).
- Bouton pour trier la liste **par ordre alphabétique** (croissant/décroissant).
- Les artistes sont cliquables pour afficher **leurs détails**.

### 3. Détails d'un artiste
- Affiche les **informations** de l'artiste (nom, description, image, etc.).
- Affiche la **liste des événements** auxquels l'artiste participe.
- Les événements affichés sont cliquables pour afficher **leurs détails**.

### 4. Listing des événements
- Affiche une liste des événements.
- Champ texte pour filtrer les événements **par nom** (filtrage dynamique côté client).
- Boutons pour trier la liste **par nom (alphabétique) et par date (chronologique)** (croissant/décroissant).
- Les événements sont cliquables pour afficher **leurs détails**.

### 5. Détails d'un événement
- Affiche les **informations** de l'événement (nom, date, artiste associé).
- Affiche la **liste des utilisateurs inscrits**.
- L'artiste associé est cliquable pour afficher **ses détails**.


## Structure du projet

```
📦 REACT-SYMFONYPROJECT/
┣ 📂 event-manager-client/        # Application client React
┃ ┣ 📂 node_modules/              # Dépendances Node.js installées
┃ ┣ 📂 src/                       # Code source de l'application
┃ ┃ ┣ 📂 components/              # Composants réutilisables
┃ ┃ ┃ ┣ 📜 ArtistCard.jsx         # Carte pour afficher un artiste
┃ ┃ ┃ ┣ 📜 EventCard.jsx          # Carte pour afficher un événement
┃ ┃ ┃ ┣ 📜 Footer.jsx             # Pied de page de l'application
┃ ┃ ┃ ┗ 📜 Navbar.jsx             # Barre de navigation
┃ ┃ ┣ 📂 pages/                   # Pages principales de l'application
┃ ┃ ┃ ┣ 📜 ArtistDetailPage.jsx   # Page de détail d'un artiste
┃ ┃ ┃ ┣ 📜 ArtistsPage.jsx        # Page listant tous les artistes
┃ ┃ ┃ ┣ 📜 EventDetailPage.jsx    # Page de détail d'un événement
┃ ┃ ┃ ┣ 📜 EventsPage.jsx         # Page listant tous les événements
┃ ┃ ┃ ┗ 📜 HomePage.jsx           # Page d'accueil
┃ ┃ ┣ 📂 services/                # Services pour les appels API
┃ ┃ ┃ ┗ 📜 api.js                 # Configuration et fonctions d'appel API
┃ ┃ ┣ 📜 App.css                  # Styles CSS pour le composant App
┃ ┃ ┣ 📜 App.jsx                  # Composant racine de l'application
┃ ┃ ┣ 📜 index.css                # Styles CSS globaux
┃ ┃ ┗ 📜 main.jsx                 # Point d'entrée de l'application React
┃ ┣ 📜 index.html                 # Fichier HTML principal
┃ ┣ 📜 package-lock.json          # Verrouillage des versions des dépendances
┃ ┣ 📜 package.json               # Configuration npm et dépendances
┃ ┣ 📜 .gitignore                 # Fichiers à ignorer par Git
┃ ┣ 📜 eslint.config.js           # Configuration ESLint pour le linting
┃ ┣ 📜 README.md                  # Documentation du projet
┃ ┗ 📜 vite.config.js             # Configuration de Vite (bundler)

```

## Installation et Exécution

### Prérequis
- [Node.js](https://nodejs.org/) installé (version recommandée : 16+)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/) installé

### Étapes d'installation
1. **Cloner le projet**
   ```sh
   git clone https://github.com/votre-repo/event-manager-client.git
   cd event-manager-client
   ```
2. **Installer les dépendances**
   ```sh
   npm install
   # ou avec yarn
   yarn install
   ```
3. **Lancer le serveur de développement**
   ```sh
   npm run dev
   # ou avec yarn
   yarn dev
   ```
4. **Ouvrir l'application**
   L'application sera disponible sur `http://localhost:5173/` (par défaut).

## Technologies utilisées
- **React** (Bibliothèque JavaScript pour l'UI)
- **Vite** (Outil de build rapide)
- **React Router** (Gestion de la navigation)

