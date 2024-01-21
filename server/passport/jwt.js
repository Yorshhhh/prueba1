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


    console.log('1)passport/jwt')
    console.log('Aqui se verifica el JWT que se envía en la petición hacia el servidor')
    console.log('y se devuelve la informacion necesaria al Front End')
    console.log('quien es el que pasa por aqui?')
    console.log(jwt_payload)

    return done(null, {
      id: user.id,
      rut: user.rut,
      nombres: user.nombres,
      apellidos: user.apellidos,
      numero_telefono: user.numero_telefono,
      correo: user.correo,
      rol: user.rol,
    });
  }
);
