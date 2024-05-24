
# Projet NestJS Final

## Description

Pour ce test final, vous allez être évalués sur votre maîtrise du framework NestJS. Ce projet, qui est une TodoList et qu'il vous faudra dupliquer (fork), contient un certain nombre de tests automatisés. Chacun d'entre eux couvre une fonctionnalité spécifique : création d'un utilisateur, création d'une tâche, vérification que le serveur renvoie une erreur dans tel ou tel cas, etc.

🎯 **Votre objectif est simple : faire passer tous ces tests en implémentant vous-mêmes ces fonctionnalités.**

Nous avons utilisé Prisma pour la gestion de la base de données.

## Prérequis

- Node.js
- NPM
- Docker

## Installation des dépendances

Pour installer toutes les dépendances nécessaires au projet, exécutez la commande suivante :

```bash
npm ci
```

## Démarrage de la base de données et du serveur

Pour démarrer la base de données PostgreSQL via Docker et le serveur, utilisez la commande suivante :

```bash
sudo npm run start:postgres
```

![Démarrage du serveur](https://cdn.discordapp.com/attachments/1197615280231284756/1243507166879678474/image.png?ex=6651b9cb&is=6650684b&hm=645a2ba1378b87e0a490a8c0aae5d6c1fa86e3a8e979975b0af089eac6e6cfff&)

## Exécution des tests

Pour exécuter les tests end-to-end (e2e) et vérifier que toutes les fonctionnalités sont correctement implémentées, utilisez la commande suivante :

```bash
sudo npm run test:e2e:postgres
```

![Exécution des tests](https://cdn.discordapp.com/attachments/1197615280231284756/1243507371456860210/image.png?ex=6651b9fc&is=6650687c&hm=56b577de1dde084d4bac713e88d2898ea397c154c7f43f3054c7a5bc37543761&)

## Commandes Utiles

- **Installation des dépendances :**

  ```bash
  npm ci
  ```

- **Démarrage de la base de données et du serveur :**

  ```bash
   npm run start:postgres
  ```

- **Exécution des tests :**

  ```bash
   npm run test:e2e:postgres
  ```

## Conclusion

L'objectif de ce projet est de nous familiariser avec le développement d'une application avec NestJS et un ORM, ici Prisma; tout en assurant que toutes les fonctionnalités requises passent les tests automatisés. Bonne chance et bon codage ! 🚀
