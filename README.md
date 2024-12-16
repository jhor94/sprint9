## Intercambio de Libros - SwappTales

# Introducción

La aplicación "Intercambio de Libros" es una plataforma diseñada para facilitar el intercambio de libros entre usuarios. Los usuarios pueden registrarse, gestionar sus bibliotecas personales (libros disponibles) y listas de deseos (libros que desean), y localizar puntos de intercambio donde pueden recoger o enviar libros. La integración con mapas permite identificar las localizaciones de estos puntos de intercambio de manera sencilla. Esta aplicación busca promover la lectura y la reutilización de recursos al conectar a usuarios con intereses similares.

# Tecnologías Utilizadas

- Backend:

Node.js: Para la lógica del servidor.

Express: Framework para la construcción de APIs RESTful.

JWT (JSON Web Tokens): Para la autenticación de usuarios.

Node Modules: Gestión de dependencias.

Environments: Configuración segura de variables de entorno.

Middlewares: Para la gestión de cookies, validación y control de acceso.

MySQL con phpMyAdmin: Base de datos relacional para la persistencia de información.

Sequelize: ORM (Object-Relational Mapping) para interactuar con la base de datos.

- Frontend:

Angular 19: Framework para la construcción del cliente.

TypeScript: Lenguaje principal para la implementación del frontend.

Angular Material: Biblioteca de componentes para una interfaz moderna.

Leaflet: Biblioteca de mapas interactivos.

Bootstrap: Para un diseño responsivo y estilizado.

Sass: Preprocesador CSS para estilos avanzados.

# Instalación

Requisitos previos:

Node.js y npm instalados.

MySQL configurado y en funcionamiento.

phpMyAdmin para la gestión de la base de datos.

Instrucciones:

- Clonar el repositorio:

git clone https://github.com/jhor94/sprint9.git

- Configuración del Backend:

Navega a la carpeta del backend:

cd back

Instala las dependencias:

npm install

Configura las variables de entorno en un archivo .env: Crea el archivo .env y añade lo siguiente

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=booksExchange
JWT_SECRET=tu_clave_secreta

Dentro de SQL : Crea una base de datos llamada booksExchange y añade la base de datos proporcionada

Inicia el servidor:

npm run dev

- Configuración del Frontend:

Navega a la carpeta del frontend:

cd ..front

Instala las dependencias:

npm install

Inicia el servidor de desarrollo:

ng serve -o


## Funcionalidades

Usuarios: Registro e inicio de sesión: Autenticación segura con JWT.

Gestión de biblioteca: Los usuarios pueden añadir libros que poseen.

Lista de deseos: Los usuarios pueden añadir libros que desean obtener.

Intercambios: Propuesta de intercambio: Los usuarios pueden ver libros disponibles de otros y proponer intercambios.

Confirmación de intercambio: Notificaciones para aceptar o rechazar solicitudes.

Localizaciones: Mapa interactivo implementado con Leaflet para mostrar puntos de intercambio.


Conexión con el Backend

Autenticación: Uso de JWT para proteger rutas y verificar usuarios.

Validaciones: Middleware de Express para verificar datos de entrada.

APIs REST: Creación, actualización y eliminación de libros.

Gestión de usuarios y sus listas. Operaciones relacionadas con puntos de intercambio.

Base de Datos:

Uso de Sequelize para interactuar con MySQL.

# Conclusiones

La aplicación "Intercambio de Libros" combina tecnologías modernas para ofrecer una experiencia intuitiva y funcional. Su enfoque en la reutilización y el intercambio promueve una práctica sostenible mientras fomenta una comunidad lectora activa. El uso de Angular en el frontend, junto con Leaflet para mapas interactivos, asegura una interfaz atractiva y eficiente. Por otro lado, el backend basado en Node.js, Express y Sequelize garantiza una gestión de datos robusta y segura. Esta aplicación es una excelente solución para los amantes de los libros que buscan compartir y descubrir nuevas lecturas.

