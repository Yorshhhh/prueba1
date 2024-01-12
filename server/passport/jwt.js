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
    const user = await _findByUserEmail(jwt_payload.correo);

    if (!user) return done(null, false, "Usuario no logeado");


    console.log('1)En algun momento pasas por aqui?')

    console.log('me estas diciendo que pasas por aqui cada vez que refresco la aplicacion?')

    console.log('quien es el que pasa por aqui?')

    console.log(jwt_payload)
    return done(null, {
      id: user.id,
      rut: user.rut,
      nombre_completo: user.nombre_completo,
      correo: user.correo,
      rol: user.rol,
    });
  }
);
