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

Pour exposer un port et utiliser l'application dans un réseau externe (les datas du cellulaire)

- php artisan serve --host=0.0.0.0 --port=9002

Comment dire au router que l'on veut exposer le port d'un ordinateur?

Il faut aller dans les paramètres du router. Pour cela il faut aller dans command promp et faire la commande "ipconfig"

À l'option "Default Gateway", il y a l'adresse du router. Il faut l'écrire dans un naviguateur pour obtenir le dashboard. 

Dans ce dashbord, il faut se connecter. Si le mot de passe n'a jamais été changé, il devrait être "admin".

Ensuite, il faut aller dans les options avancé et aller dans "Port Forwarding".

On ajoute une nouvelle règles: 

 - Name: ExportProjectPort
 - Status: On
 - Protocol: Tcp (ou both)
 - Internal port: 9002
 - External port: 9002
 - Local IP Adresse: (Choisir l'appareil où le projet roule)

On teste cela en partant le projet et avec un autre appareil, on tape l'adresse ipv4 de mon appareil qui roule le projet:9002 dans un naviguateur.

Exemple:  76.69.186.XXXX:9002