#!/bin/bash

echo "Démarrage des services backend et base de données Dentarius..."
echo "Construction et démarrage des conteneurs Docker..."
docker-compose up --build -d

echo "Conteneurs démarrés en arrière-plan."
echo "Pour voir les logs, exécutez : docker-compose logs -f"
echo "Pour arrêter les services, exécutez : docker-compose down"