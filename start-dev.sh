#!/bin/bash

# Démarrer les services Docker
docker-compose up -d

# Attendre que le backend soit prêt
echo "Waiting for backend to be ready..."
sleep 10

# Démarrer le frontend en mode développement
cd frontend
npm run dev