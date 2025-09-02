FROM node:18.16-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Afficher le contenu du répertoire pour déboguer
RUN ls -la

# Exécuter la commande build avec plus de détails
RUN npm run build --verbose

# Étape de production avec Nginx
FROM nginx:alpine

# Copier les fichiers de build
COPY --from=build /app/dist /usr/share/nginx/html

# Copier la configuration Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]