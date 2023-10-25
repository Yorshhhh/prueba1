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


las funcionalidades detalladas en la minuta de control de la programación han sido implementadas del lado del servidor, actualmente para hacer uso del proyecto hay que hacer lo siguiente:
- Crear un usuario admin a travéz de postman siguiendo usando este formato:
"{
  "rut": 6,
  "nombre_completo": "eduardo novoa",
  "numero_telefono": 11,
  "correo": "eduardo@duoc.cl",
  "password": "asdf",
  "rol": "admin
}"

por otro lado, para probar la informacion de un usuario con rol "user"
solo basta con levantar ambos servidor y cliente con "npm run dev" en una consola distinta cada uno, una vez se haya realizado esto, en la aplicación desde la consola
en "client" ya podrá registrar los usuarios que se desee.

acto seguido una vez el usuario este registrado y ya exista en la base de datos, en la navbar en el boton "login" autentiquese con los datos de los usuarios que desee probar, y este la direccionará a un dashboard o a la pagina de admin dependiendo de su rol.

en orden para probar el nivel de acceso, que aún no se ha implementado en el front end, se recomienda utilizar postman o thunderclient para realizar las peticiones con las credenciales anteriormente mencionadas de manera que:

como user:
Si el usuario ya está registrado por el frontend, acceda a la ruta "/auth/login/" y ingrese las respectivas credenciales, si está todo bien el server le asignará un token de navegación, copie este token para continuar.

ahora para poder comprobar que un usuario de rol "user" no tiene acceso a la ruta "/users" pese a tener su token de navegación realice una petición "GET" a la ruta "/users"
y en el "Header" de la petición agregue el campo "Authorization"
y en el valor agregue "Bearer [su token asignado] y realice la petición.

como admin:
Como se menciono anteriormente el usuario admin debe ser ingresado a travéz de un post a la ruta "/auth/register" especificando el rol "admin", una vez tenga su cuenta, dirijase a la ruta "/auth/login" y ingrese sus credenciales, repita el mismo proceso de guardar el token que se le asigne al logearse.
Acto seguido realice realice una petición "GET" a la ruta "/users"
y en el "Header" de la petición agregue el campo "Authorization"
y en el valor agregue "Bearer [su token asignado] y realice la petición, podrá ver que un user de rol "admin" si tiene acceso a esta ruta.