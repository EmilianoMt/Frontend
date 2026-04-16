# Turing-IA: Catálogo de Exhibición Automotriz (Frontend)

Esta es la interfaz de usuario de la plataforma de exhibición automotriz. Desarrollada con **Next.js**, esta aplicación consume la API previamente realizada para ofrecer una experiencia fluida de visualización de catálogo, gestión de inventario y autenticación segura.

## Características

* Catálogo de vehículos con imágenes, precio y año.
* Filtros para ver vehículos antes o después de 2020.
* Login y registro con correo y contraseña.
* Protección de rutas para acceder al panel solo con sesión iniciada.
* Panel de administrador para crear, editar y eliminar vehículos.
* Registro de marcas desde la interfaz.
* Diseño responsivo para escritorio y móvil.

## Tecnologías usadas

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS
* Lucide React para iconos

## Requisitos para ejecutarlo en local

Antes de correr el proyecto necesitas tener instalado:

* Node.js 18 o superior
* npm
* Acceso a la API del backend

## Configuración local

### 1. Clonar el repositorio

```bash
git clone https://github.com/EmilianoMt/Frontend
cd Frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar la API

Crea o revisa tu archivo `.env` y agrega la URL del backend:

```bash
NEXT_PUBLIC_API_URL=https://backend-br01.onrender.com
```

### 4. Ejecutar el proyecto

```bash
npm run dev
```

Luego abre:

```bash
http://localhost:3000
```

## Comandos útiles

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Nota

Si el catálogo no carga, revisa que la API esté disponible y que `NEXT_PUBLIC_API_URL` tenga la ruta correcta.



