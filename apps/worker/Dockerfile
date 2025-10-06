# Dockerfile para el Worker (NestJS)

# ---- Base ----
# Imagen base con Node.js y pnpm
FROM node:20-alpine AS base
RUN npm install -g pnpm
WORKDIR /usr/src/app

# ---- Dependencias ----
# Copia los archivos de gestión de paquetes y el workspace
# Instala SOLO las dependencias de producción para mantener la imagen ligera
FROM base AS dependencies
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY apps/worker/package.json ./apps/worker/
COPY packages/typescript-config/package.json ./packages/typescript-config/
RUN pnpm install --prod --filter worker

# ---- Build ----
# Copia el código fuente y compila la aplicación
FROM base as build
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY apps/worker ./apps/worker
COPY packages ./packages
RUN pnpm --filter worker build

# ---- Producción ----
# Imagen final de producción, copia solo los artefactos necesarios
FROM node:20-alpine AS production
ENV NODE_ENV=production
WORKDIR /usr/src/app
# Copia las dependencias de producción
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
# Copia la aplicación compilada
COPY --from=build /usr/src/app/apps/worker/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main.js"]
