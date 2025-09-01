FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Exposer le port sur lequel le serveur s'exécute
EXPOSE 3001

# Commande pour démarrer l'application
CMD ["node", "index.js"]