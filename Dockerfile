# Etapa 1: Construcción del proyecto Angular
FROM node:18-alpine AS build

# Establecer directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias (no copiar node_modules desde fuera)
RUN npm install --legacy-peer-deps

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación Angular para producción
RUN npm run build -- --prod

# Etapa 2: Servir la aplicación Angular usando NGINX
FROM nginx:alpine

# Copiar los archivos construidos desde la etapa anterior
COPY --from=build /usr/src/app/dist/ehr-frontend /usr/share/nginx/html

# Copiar el archivo de configuración de NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto en el que NGINX servirá la aplicación
EXPOSE 80

# Comando para iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]
