# MouseKeeper

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

<div align="center">
  <img src="images/mousekeeper_logo_128x128.png" alt="MouseKeeper Logo" width="128" height="128">
</div>

## 📋 Description

MouseKeeper est une extension Chrome qui simule la présence de votre souris dans un onglet même lorsque vous travaillez ailleurs. Cette extension est idéale pour maintenir les sessions actives sur les sites web qui se déconnectent après une période d'inactivité.

## ✨ Fonctionnalités

- Simule l'activité de la souris dans l'onglet
- Prévient la déconnexion automatique des sites web
- Interface simple avec indicateur d'état
- Badge visuel sur l'icône de l'extension (ON/OFF)
- Fonctionne en arrière-plan sans perturber votre navigation

## 🚀 Installation

### Depuis le code source

1. Clonez ce dépôt :
   ```bash
   git clone https://github.com/ElTHumeau/mousekeeper.git
   cd mousekeeper
   ```

2. Installez les dépendances et compilez l'extension :
   ```bash
   npm install
   npm run build
   ```

3. Chargez l'extension dans Chrome :
   - Ouvrez Chrome et accédez à `chrome://extensions/`
   - Activez le "Mode développeur" (coin supérieur droit)
   - Cliquez sur "Charger l'extension non empaquetée"
   - Sélectionnez le dossier `dist` du projet

## 💻 Utilisation

1. Cliquez sur l'icône de MouseKeeper dans la barre d'outils de Chrome
2. Activez l'interrupteur pour démarrer la simulation de mouvement de souris
3. L'icône affichera "ON" lorsque l'extension est active
4. Désactivez l'interrupteur pour arrêter la simulation

## 🛠️ Développement

### Prérequis

- Node.js (v14 ou supérieur)
- npm (v6 ou supérieur)

### Commandes disponibles

```bash
# Installation des dépendances
npm install

# Lancement des tests
npm test

# Compilation de l'extension
npm run build

# Mode développement (compilation automatique)
npm run dev

# Création d'une archive ZIP pour distribution
npm run zip
```

### Structure du projet

```
MouseKeeper/
├── dist/               # Code compilé prêt à être chargé dans Chrome
├── images/             # Logos et images de l'extension
├── scripts/            # Scripts utilitaires
├── src/                # Code source
│   ├── css/            # Styles CSS
│   ├── html/           # Fichiers HTML
│   └── js/             # Scripts JavaScript
├── tests/              # Tests unitaires et de validation
├── .eslintrc.json      # Configuration ESLint
├── jest.config.js      # Configuration Jest
├── manifest.json       # Manifeste de l'extension Chrome
├── package.json        # Configuration npm et dépendances
└── webpack.config.js   # Configuration Webpack
```

## 🧪 Tests

L'extension inclut des tests unitaires et des pages de test pour vérifier son bon fonctionnement :

```bash
# Exécuter tous les tests
npm test

# Ouvrir les pages de test dans le navigateur
tests/test-site.html
tests/strict-test/index.html
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Veuillez suivre ces conventions :

- **Branches** : `feature/nom-fonctionnalite`, `fix/nom-correction`
- **Commits** : `type: description` (types : feat, fix, docs, style, refactor, test, chore)
- **Pull Requests** : Créez une PR avec une description claire des modifications

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.
