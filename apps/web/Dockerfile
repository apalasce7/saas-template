# Dockerfile para el Frontend (Next.js)

# ---- Base ----
# Imagen base con Node.js y pnpm
FROM node:20-alpine AS base
RUN npm install -g pnpm
WORKDIR /usr/src/app

# ---- Dependencias ----
# Instala todas las dependencias (incl. dev) para poder construir el proyecto
FROM base AS dependencies
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/
COPY packages/typescript-config/package.json ./packages/typescript-config/
RUN pnpm install --filter web

# ---- Build ----
# Copia el código fuente y compila la aplicación
FROM base as build
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY apps/web ./apps/web
COPY packages ./packages
RUN pnpm --filter web build

# ---- Producción ----
# Imagen final de producción, copia solo los artefactos de la build standalone
FROM node:20-alpine AS production
ENV NODE_ENV=production
WORKDIR /usr/src/app

COPY --from=build /usr/src/app/apps/web/public ./apps/web/public
COPY --from=build --chown=nextjs:nodejs /usr/src/app/apps/web/.next/standalone ./apps/web/
COPY --from=build --chown=nextjs:nodejs /usr/src/app/apps/web/.next/static ./apps/web/.next/static

EXPOSE 3000

CMD ["node", "apps/web/server.js"]
