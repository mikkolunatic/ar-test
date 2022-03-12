Installation

Composer: https://getcomposer.org/

Wampserver: https://www.wampserver.com/en/

npm (possibilité d'instalation via node js)

Php:

2 méthodes:

- Utiliser celui fourni par wampserver (facile) -> Il suffit d'ajuster les variables d'environnement vers le dossier de la version de php désiré (Jutilise personnellement la version 8.0.2)

- Installer une version de php disponible sur le site oficielle à la mitaine

***Important:*** Il faut créer un fichier .env à partir du fichier .env.example. Les valeurs à ajuster:

- DB_DATABASE : le nom de la base de donné

- DB_USERNAME : le nom d'utilisateur pour se connecter à la bd (root par défaut)

- DB_PASSWORD : le mot de passe pour accéder à la bd (vide par défaut)

Les commandes à exécuter lors de l'ouverture du projet (dans le terminal):

Mettre à jour les dépendances. À exécuter dès qu'on ouvre un nouveau projet

- composer update --no-scripts

Build les assets

- npm run dev

Permet d'exécuter les migrations et les seeds vers la bd

- php artisan migrate:refresh --seed

Permet de lancer l'application

- php artisan serve
