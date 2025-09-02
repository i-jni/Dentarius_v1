FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env.prod .env

# Copier le dossier prisma séparément pour générer avant le reste
COPY prisma ./prisma

# Génère le client Prisma
RUN npx prisma generate

# Exposer le port sur lequel le serveur s'exécute
EXPOSE 3001

# Commande pour démarrer l'application
CMD ["node", "index.js"]