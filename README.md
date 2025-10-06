# 🚀 SaaS Boilerplate: Next.js, NestJS, Prisma, Docker y Kubernetes

¡Bienvenido! Este es un repositorio de plantilla (boilerplate) diseñado para ser el punto de partida **perfecto y de nivel de producción** para tu próximo proyecto SaaS.

El objetivo es simple: ahorrarte días de configuración inicial y darte una base sólida, escalable y moderna para que puedas centrarte en lo que realmente importa: **construir las funcionalidades únicas de tu aplicación.**

---

## ✨ Stack Tecnológico

Este boilerplate integra una selección de tecnologías modernas, robustas y ampliamente utilizadas en la industria.

| Categoría | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Monorepo** | 🅿️ pnpm + Turborepo | Gestión eficiente de un único repositorio con múltiples proyectos. |
| **Frontend** | ⚛️ Next.js (React) | Framework líder para aplicaciones web rápidas y modernas. |
| **UI (Frontend)** | 🎨 Tailwind CSS + Shadcn/ui | Estilado rápido y componentes de UI accesibles y personalizables. |
| **Backend (API)** | nestjs NestJS | Framework de Node.js para construir APIs eficientes y escalables. |
| **Base de Datos (ORM)** | 🐘 Prisma | ORM de nueva generación para una interacción segura y fácil con la BD. |
| **Base de Datos** | PostgreSQL | Base de datos relacional, potente y de código abierto. |
| **Tareas Asíncronas** |  bullmq BullMQ + Redis | Sistema de colas para gestionar tareas en segundo plano (ej. enviar emails). |
| **Contenerización** | 🐳 Docker | Empaquetado de aplicaciones para desarrollo y producción consistentes. |
| **Orquestación** | ☸️ Kubernetes (k3s) | Manifiestos listos para desplegar la aplicación de forma escalable. |

---

## ✅ Características Incluidas

- **Entorno de Desarrollo Local con un solo comando:** `docker-compose up` levanta toda la infraestructura (PostgreSQL, Redis) al instante.
- **Autenticación de Usuarios Lista:** Flujo completo de registro e inicio de sesión (JWT) ya implementado.
- **Código Estructurado:** Separación clara entre `apps` (web, api, worker) y `packages` (código compartido).
- **Dockerfile Optimizado por Aplicación:** Builds multi-etapa para imágenes de producción ligeras y seguras.
- **Manifiestos de Kubernetes (k8s):** Archivos `Deployment`, `Service` e `Ingress` listos para desplegar en un clúster.
- **Variables de Entorno Seguras:** Uso de `.env.example` para una configuración segura y clara.

---

## 🛠️ 1. Requisitos Previos

Antes de empezar, tu ordenador necesita tener instaladas algunas herramientas básicas. No te preocupes, aquí te explicamos qué es cada una y dónde encontrarla.

1.  **Node.js:** Es el entorno que permite ejecutar JavaScript fuera del navegador (nuestro backend funciona con él).
    -   **Versión recomendada:** 18 o superior.
    -   **¿Cómo instalarlo?:** Descárgalo desde su [página web oficial](https://nodejs.org/es).

2.  **pnpm:** Es un gestor de paquetes para Node.js, como `npm` pero más rápido y eficiente, ideal para monorepos.
    -   **¿Cómo instalarlo?:** Abre una terminal (después de instalar Node.js) y ejecuta:
        ```bash
        npm install -g pnpm
        ```

3.  **Docker Desktop:** Es una aplicación que nos permite ejecutar "contenedores", que son como mini-ordenadores virtuales. La usamos para ejecutar nuestra base de datos (PostgreSQL y Redis) de forma aislada y sencilla.
    -   **¿Cómo instalarlo?:** Descárgalo desde su [página web oficial](https://www.docker.com/products/docker-desktop/).
    -   **¡Importante!** Antes de seguir los pasos de instalación, asegúrate de que Docker Desktop esté **abierto y funcionando** en tu ordenador.

---

## 🚀 2. Guía de Instalación y Ejecución

Sigue estos pasos en orden. Han sido diseñados para que funcionen sin problemas.

### Paso 1: Obtener el código

Este repositorio es una plantilla. **NO LO CLONES DIRECTAMENTE.**

1.  Ve a la página principal de este repositorio en GitHub.
2.  Haz clic en el botón verde **"Use this template"** y luego en **"Create a new repository"**.
3.  Dale un nombre a tu nuevo repositorio (ej. `mi-nuevo-saas`) y créalo.
4.  Ahora, clona **tu nuevo repositorio** en tu ordenador. Reemplaza la URL con la de tu repositorio:
    ```bash
    git clone https://github.com/tu-usuario/tu-nuevo-repositorio.git
    ```

### Paso 2: Configurar las Variables de Entorno

Los secretos y URLs de conexión se gestionan en un archivo especial.

1.  Navega con tu terminal a la carpeta de la API:
    ```bash
    cd tu-nuevo-repositorio/apps/api
    ```
2.  Copia el archivo de ejemplo `.env.example` para crear tu propio archivo `.env`.
    -   En **Windows**, ejecuta:
        ```bash
        copy .env.example .env
        ```
    -   En **Mac/Linux**, ejecuta:
        ```bash
        cp .env.example .env
        ```
3.  Vuelve a la carpeta raíz del proyecto:
    ```bash
    cd ../..
    ```
    *Para el desarrollo local, los valores que vienen por defecto en el archivo son suficientes. ¡No necesitas cambiar nada más por ahora!*

### Paso 3: Instalar todas las dependencias

Este único comando descargará e instalará todo lo necesario para todas las aplicaciones del proyecto.

```bash
pnpm install
```

### Paso 3.5: Generar el Cliente de Base de Datos

Este es un paso crucial. Genera el código que Prisma utiliza para comunicarse con la base de datos de forma segura.

```bash
pnpm --filter api exec prisma generate
```

### Paso 3.6: Aplicar las Migraciones a la Base de Datos

Este comando crea las tablas (User, Project, etc.) en tu base de datos Docker.

```bash
pnpm --filter api exec prisma migrate dev
```

### Paso 4: ¡Levantar el entorno!

Necesitarás tener **3 terminales abiertas** al mismo tiempo. Cada una se encargará de un servicio vital.

#### ➡️ Terminal 1: Iniciar la Base de Datos

1.  Asegúrate de que **Docker Desktop esté abierto y corriendo**.
2.  En la raíz de tu proyecto, ejecuta:
    ```bash
    docker-compose up -d
    ```
    *Este comando inicia PostgreSQL y Redis en segundo plano. Puedes cerrar esta terminal si quieres, los servicios seguirán activos mientras Docker no se cierre.*

#### ➡️ Terminal 2: Iniciar el Backend (API)

1.  Abre una **NUEVA** terminal.
2.  En la raíz de tu proyecto, ejecuta:
    ```bash
    pnpm --filter api start:dev
    ```
    *Deja esta terminal abierta. Aquí verás los logs del servidor. Es normal que veas mucho texto al principio.*

#### ➡️ Terminal 3: Iniciar el Frontend (Web)

1.  Abre una **TERCERA** terminal.
2.  En la raíz de tu proyecto, ejecuta:
    ```bash
    pnpm --filter web dev
    ```
    *Deja esta terminal abierta. Cuando termine de compilar, te mostrará un mensaje como `✓ Ready in 12s`, junto a la URL para acceder a la aplicación.*

### ¡Listo! 🎉

Si has seguido todos los pasos, la aplicación ya está funcionando.

-   **Accede a la App:** Abre tu navegador y ve a **http://localhost:3001**.
-   **Usa la App:** Puedes registrar un nuevo usuario, iniciar sesión y empezar a usar el dashboard de proyectos.

---

## 📂 3. Estructura del Proyecto

-   `apps/api`: Aplicación de backend (NestJS). Aquí vive toda la lógica de negocio.
-   `apps/web`: Aplicación de frontend (Next.js). La interfaz que ven tus usuarios.
-   `apps/worker`: Servicio para tareas pesadas en segundo plano (NestJS).
-   `packages/`: Carpeta para código compartido entre las aplicaciones (ej. configuraciones de TypeScript).
-   `k8s/`: Manifiestos de Kubernetes listos para el despliegue en producción.

---

## ☁️ 4. Despliegue (Producción)

Este boilerplate está preparado para un despliegue en producción usando contenedores.

1.  **Dockerfiles:** Cada aplicación en la carpeta `apps` tiene su propio `Dockerfile` optimizado para crear una imagen de producción.
2.  **Manifiestos de Kubernetes:** La carpeta `k8s` contiene todos los archivos `.yaml` necesarios para desplegar el sistema completo en un clúster de Kubernetes (como k3s, EKS, GKE, etc.).

La configuración de un pipeline de CI/CD para automatizar este proceso es el siguiente paso lógico y dependerá de tu proveedor de nube y tus preferencias.
