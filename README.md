# Dentarius_v1# 

🦷 Dentarius

Plateforme collaborative pour étudiants en dentaire

Une application web moderne permettant aux étudiants en dentaire de partager leurs connaissances et collaborer efficacement.
🚀 Fonctionnalités

    👤 Authentification : Inscription et connexion sécurisées
    📚 Gestion de cours : Création, modification et consultation de cours
    🔍 Recherche : Recherche avancée dans les cours
    👥 Profils utilisateurs : Gestion des profils étudiants
    📱 Responsive : Interface adaptée mobile et desktop
    🔒 Sécurité : Protection des données et authentification JWT

🛠️ Technologies
Frontend

    React + Vite
    SCSS pour le styling
    React Router pour la navigation

Backend

    Node.js  + Express
    Prisma ORM
    MySQL base de données
    JWT authentification
    bcrypt chiffrement des mots de passe

Déploiement

    PM2 gestionnaire de processus
    Nginx serveur web
    GitHub Actions CI/CD
    Docker développement local

📦 Installation
Prérequis

    Node.js 18+
    MySQL 8.0+
    Docker (optionnel pour le développement)

Développement Local

bash

Copy
# Cloner le projet  
git clone https://github.com/i-jni/Dentarius_v1.git  
cd Dentarius_v1  
  
# Option 1 : Avec Docker (recommandé)  
docker-compose up  
  
# Option 2 : Installation manuelle  
# Backend  
cd backend  
npm install  
cp .env.example .env  
# Configurer la base de données dans .env  
npx prisma migrate dev  
npm run dev  
  
# Frontend (nouveau terminal)  
cd frontend  
npm install  
npm run dev  

Accès

    Frontend : http://localhost:5173
    Backend API : http://localhost:3001
    Production : https://dentarius.org

🧪 Tests

cd backend  
  
# Tests unitaires  
npm run test:unit  
  
# Tests d'intégration  
npm run test:integration  
  
# Tests de sécurité  
npm run test:security  
  
# Couverture de code  
npm run test:coverage  

📁 Structure du Projet

Dentarius_v1/  
├── backend/           # API Node.js + Express  
│   ├── controllers/   # Logique métier  
│   ├── middleware/    # Middlewares Express  
│   ├── prisma/        # Schéma et migrations BDD  
│   └── __tests__/     # Tests automatisés  
├── frontend/          # Interface React  
│   ├── src/  
│   │   ├── components/  # Composants réutilisables  
│   │   ├── pages/       # Pages de l'application  
│   │   └── assets/      # Styles SCSS  
└── docker-compose.yml # Configuration Docker  

🌐 Déploiement

Le projet utilise GitHub Actions pour le déploiement automatique :

    Push sur main → Déclenchement automatique
    Tests → Validation du code
    Build → Construction des assets
    Deploy → Mise en production

