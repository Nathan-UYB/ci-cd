# Utilise une image officielle Node.js comme image parente
FROM node:20-alpine

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install --production

# Copie le reste du code de l'application
COPY . .

# Expose le port utilisé par l'application
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["node", "server.js"]
