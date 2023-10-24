cabres para ejecutar el proyecto se tienen que abrir 2 consolas una desde la carpeta client y otra desde la carpeta server
para compilar necesitan ejecutar el comando "npm run dev" en ambas carpetas para inicializarlas

para que el proyecto funcione en sus computadores tienen que configurar una conexión a una base de datos
una vez lo hagan necesitan remplazar los siguientes valores en la ruta: proyecto 2/server/config/config.json
con las credenciales y el dueño del esquema de su base de datos
{
  "development": {
    "username": "jorge",
    "password": "duoc",
    "database": "xe",
    "host": "127.0.0.1",
    "dialect": "oracle"
  },


