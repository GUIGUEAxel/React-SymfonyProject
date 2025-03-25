# ReactSymfonyProject
Suite du projet Symfony



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
