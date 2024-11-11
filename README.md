# Project Management Tool (Frontend)

## Description
Ce projet représente le frontend de la plateforme **Project Management Tool (PMT)**. Il a été développé avec **Angular** et fournit une interface utilisateur intuitive pour la gestion des projets et des tâches.

## Prérequis
Assurez-vous d'avoir les outils suivants installés sur votre machine :
- **Node.js** (version 14 ou supérieure)
- **Angular CLI** (version 11 ou supérieure)
- **Docker** (pour la containerisation)
- **Git**
- **NPM**

## Installation et Configuration
### 1. Cloner le dépôt
```bash
git clone https://github.com/Dupy007/MPMT-FRONT.git
cd MPMT-FRONT
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Lancer l'application
```bash
ng serve
```

L'application sera accessible sur `http://localhost:4200`.

## Dockerisation
### 1. Construire l'image Docker
```bash
docker build -t mpmt-front .
```

### 2. Exécuter l'application via Docker
```bash
docker run -d -p 4200:80 mpmt-front
```

L'application sera disponible sur `http://localhost:4200`.
