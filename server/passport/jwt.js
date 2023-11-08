const JWTStrategy = require("passport-jwt").Strategy,
  ExtractJWT = require("passport-jwt").ExtractJwt,
  { _findByUserEmail } = require("../controllers/users");

module.exports = new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY,
    ignoreExpiration: false,
  },
  async (jwt_payload, done) => {
    //Despues de definir la estrategia y autenticar el usuario
    //a travez de "_findByUserEmail" preguntamos si el correo enviado desde el formulario es el mismo que el correo en la base de datos
    const user = await _findByUserEmail(jwt_payload.correo);
   /*  console.log("jwt payload desde passport/jwt: ",jwt_payload) */

    if(!user) return done(null,false,'Usuario no logeado (?)')

    return done(null, {
        id: user.id,
        rut: user.rut,
        nombre_completo: user.nombre_completo,
        correo: user.correo,
        rol: user.rol
    })
  }
);
