# Dockerfile pour déployer l'application Angular 17

# Étape 1: Build de l'application
FROM node:18 AS build-stage
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build -- --configuration production

# Étape 2: Exécution avec Nginx
FROM nginx:1.23-alpine
COPY --from=build-stage /app/dist/view/browser/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

