# GIA - Guía de Desarrollo Backend ⚙️

Este directorio contiene la lógica del lado del servidor para el **Gestor Inteligente Académico (GIA)**. El backend está construido con **Node.js** y el framework **Express**, actuando como el puente entre los datos de las instituciones y la interfaz de usuario.

## 🛠️ Configuración e Instalación

Para poner en marcha el entorno de desarrollo, sigue estos pasos en la terminal dentro de esta carpeta:

1. **Inicializar Node.js:**

   ```bash
   npm init -y
   ```

   Esto crea el archivo `package.json` que gestionará nuestras dependencias y scripts.

2. **Instalar Framework Express:**
   ```bash
   npm install express
   ```
   Express nos permitirá manejar rutas HTTP, peticiones del frontend y middlewares de forma eficiente.

## 📂 Estructura de Archivos

- `server.js`: El motor del proyecto. Aquí se configura el puerto, los middlewares y las rutas principales.
- `/database/datos.js`: Archivo de persistencia temporal. Contiene un array de objetos que simula una base de datos para pruebas rápidas.

## 🔄 Flujo de Datos y Lógica del Servidor

El backend de GIA sigue este flujo operativo para la Fase 1:

### 1. Servicio de Archivos Estáticos

El servidor debe configurarse para exponer la carpeta `/Frontend`. Esto permite que al entrar a la raíz del servidor, se cargue automáticamente el `index.html`.

### 2. Procesamiento de Búsquedas (API)

- El frontend envía una consulta (ej: nombre de escuela) desde `index.html` o `resultados.html`.
- `server.js` recibe la petición, consulta el array en `datos.js` y aplica filtros (ej: `.filter()`).
- El servidor responde con un objeto **JSON** que contiene solo los resultados coincidentes.

### 3. Gestión de Autenticación (Login/Registro)

- Se reciben datos mediante el método **POST** desde `login.html`.
- Si los datos son válidos, el servidor responde con una instrucción de redirección hacia `panel-control.html`.

## 🚀 Endpoints Principales (Propuestos)

| Método   | Ruta                     | Acción                                         |
| :------- | :----------------------- | :--------------------------------------------- |
| **GET**  | `/api/instituciones`     | Obtiene el listado de todas las instituciones. |
| **GET**  | `/api/buscar?nombre=...` | Filtra instituciones por nombre o ciudad.      |
| **POST** | `/api/login`             | Valida credenciales de una institución.        |

## 🏃 Ejecución

Para iniciar el servidor, utiliza el comando:

```bash
node server.js
```

_Nota: Se recomienda instalar `nodemon` (`npm install -g nodemon`) para que el servidor se reinicie automáticamente al detectar cambios en el código._
