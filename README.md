[Logo athena](http://www.athena-app.fr/menu.jpg "Logo Title Text 1")

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

## Description
L'application Athena a été réalisée avec [Ionic](https://github.com/ionic-team/ionic) (Cordova + Angular).

Elle permet de notifier les utilisateurs lorsque du contenu est posté par les médias libres intégrés à l'application

## Prérequis d'utilisation

- [Node JS](https://nodejs.org/fr/download/)
- [Ionic](https://github.com/ionic-team/ionic)  ``` npm i -g ionic ```
- [cordova](https://github.com/apache/cordova)  ``` npm i -g cordova@9.0.1 (ou supérieur) ```

## Installation en local

#### Récupération du projet

```bash
$ git clone https://github.com/hugoblanc/Athena.git
$ cd Athena
```


## Running the app

```bash
# démarrage dans le navigateur avec livereload
$ ionic serve

# création d'un apk (android) ou d'un projet xcode en fonction de la plateforme ciblée
$ ionic cordova build android
ou/et 
$ ionic cordova build ios


# Démarrer l'application sur le téléphone
$ ionic cordova run android
# Pour ios il faut build comme à l'étape précédente puis aller dans platforms/ios/ et ouvrir le workspace Athena

# Démarrer l'application sur le téléphone en mode debug
$ ionic cordova run android -l
# Compliqué sur ios

# En mode production
$ ionic cordova run android --prod --release

```

## Règle de commit
Utilisation de standard-version pour générer automatiquement les changelogs: 

`git commit -a -m"<type>[optional scope]: <description>"`
***type***: feat, fix, BREAKING CHANGE, docs, refactor, test, optimization 

[Article medium](https://medium.com/jobtome-engineering/how-to-generate-changelog-using-conventional-commits-10be40f5826c)


## Support

Athena est un projet open source qui a pour objectif de permettre à chacun de s'impliquer dans le projet.
Si vous jugez qu'il manque des fonctionnalités vous pouvez proposer une pull request que j'ajouterai au projet

## Stay in touch

- Auteur - Hugo Blanc - hugoblanc.blend@gmail.com


## License
  Athena est sous licence [LGPL-3.0](LICENSE).
