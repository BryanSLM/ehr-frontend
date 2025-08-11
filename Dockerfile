# Etapa 1: Build Angular
FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build --prod

# Etapa 2: Servir con Nginx
FROM nginx:alpine

COPY --from=build /usr/src/app/dist/ehr-frontend /usr/share/nginx/html

# Copiar el archivo de configuración de NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
