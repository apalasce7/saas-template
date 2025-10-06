# Dockerfile para la API (NestJS)

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
COPY apps/api/package.json ./apps/api/
COPY packages/typescript-config/package.json ./packages/typescript-config/
RUN pnpm install --prod --filter api

# ---- Build ----
# Copia el código fuente y compila la aplicación
FROM base as build
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY apps/api ./apps/api
COPY packages ./packages
# Prisma
COPY prisma ./prisma
RUN pnpm --filter api prisma:generate
# Build
RUN pnpm --filter api build

# ---- Producción ----
# Imagen final de producción, copia solo los artefactos necesarios
FROM node:20-alpine AS production
ENV NODE_ENV=production
WORKDIR /usr/src/app
# Copia las dependencias de producción
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
# Copia la aplicación compilada
COPY --from=build /usr/src/app/apps/api/dist ./dist
# Copia el schema de prisma para que esté disponible en runtime
COPY ./apps/api/prisma ./prisma
EXPOSE 3000
CMD ["node", "dist/main.js"]
