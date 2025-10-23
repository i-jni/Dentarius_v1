FROM node:18

WORKDIR /app

# Copier les fichiers package d'abord (pour le cache Docker)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le dossier prisma
COPY prisma ./prisma

# Générer le client Prisma
RUN npx prisma generate

# Copier le reste du code
COPY . .

# Exposer le port
EXPOSE 3001

# Attendre que la DB soit prête et lancer les migrations
CMD ["sh", "-c", "npx prisma migrate deploy && node index.js"]