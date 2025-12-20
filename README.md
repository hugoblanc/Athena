[Logo athena](http://athena-app.xyz/assets/menu.jpg "Logo Title Text 1")

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

## Description

L'application Athena a été réalisée avec [Ionic](https://github.com/ionic-team/ionic) (Cordova + Angular).

Elle permet de notifier les utilisateurs lorsque du contenu est posté par les médias libres intégrés à l'application

## Prérequis d'utilisation

- [Node JS](https://nodejs.org/fr/download/)
- [Ionic](https://github.com/ionic-team/ionic) `npm i -g ionic`
- [cordova](https://github.com/apache/cordova) `npm i -g cordova@9.0.1 (ou supérieur)`

## Installation en local

#### Récupération du projet

```bash
$ git clone https://github.com/hugoblanc/Athena.git
$ cd Athena
```

## Running the app

### Développement dans le navigateur

```bash
# démarrage dans le navigateur avec livereload
$ ionic serve
```

### Déploiement sur appareil Android

**⚠️ Important**: L'application utilise maintenant Capacitor au lieu de Cordova. La commande `ionic capacitor run` est en beta et n'effectue PAS de déploiement direct sur l'appareil - elle ouvre seulement Android Studio.

**Commandes recommandées** (utilisant Capacitor CLI directement):

```bash
# Workflow complet : build + sync + run sur appareil Android
$ npm run android

# Ou étape par étape :
$ npm run build              # Build l'application web (génère le dossier www/)
$ npm run cap:sync:android   # Synchronise les assets web vers Android
$ npm run cap:run:android    # Lance l'app sur l'appareil Android connecté

# Ouvrir Android Studio pour build manuel
$ npm run cap:open:android
```

### Déploiement sur appareil iOS

```bash
# Workflow complet : build + sync + ouvre Xcode
$ npm run ios

# Ou étape par étape :
$ npm run build            # Build l'application web
$ npm run cap:sync:ios     # Synchronise les assets web vers iOS
$ npm run cap:open:ios     # Ouvre Xcode

# Puis dans Xcode : ouvrir ios/App/App.xcworkspace et lancer sur appareil
```

### Commandes Capacitor disponibles

```bash
# Synchronisation
$ npm run cap:sync           # Sync tous les platforms
$ npm run cap:sync:android   # Sync Android uniquement
$ npm run cap:sync:ios       # Sync iOS uniquement

# Exécution directe
$ npm run cap:run:android    # Run sur Android (sans rebuild)
$ npm run cap:run:ios        # Run sur iOS (sans rebuild)

# Ouvrir les IDE natifs
$ npm run cap:open:android   # Ouvre Android Studio
$ npm run cap:open:ios       # Ouvre Xcode
```

### Troubleshooting

**Problème : `ionic capacitor run android` ouvre Android Studio au lieu de déployer**
- C'est le comportement normal de la commande Ionic CLI (en beta)
- **Solution** : Utiliser `npm run android` ou `npx cap run android` à la place

**Problème : Erreur "www directory not found"**
- **Solution** : Lancer `npm run build` avant toute commande Capacitor

**Vérifier la connexion de l'appareil Android**
```bash
$ adb devices
```

## Règle de commit

Utilisation de standard-version pour générer automatiquement les changelogs:

`git commit -a -m"<type>[optional scope]: <description>"`
**_type_**: feat, fix, BREAKING CHANGE, docs, refactor, test, optimization

[Article medium](https://medium.com/jobtome-engineering/how-to-generate-changelog-using-conventional-commits-10be40f5826c)

## Support

Athena est un projet open source qui a pour objectif de permettre à chacun de s'impliquer dans le projet.
Si vous jugez qu'il manque des fonctionnalités vous pouvez proposer une pull request que j'ajouterai au projet

## Stay in touch

- Auteur - Hugo Blanc - hugoblanc.blend@gmail.com

## License

Athena est sous licence [LGPL-3.0](LICENSE).
