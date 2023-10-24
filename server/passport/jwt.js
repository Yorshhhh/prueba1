const JWTStrategy = require("passport-jwt").Strategy,
  ExtractJWT = require("passport-jwt").ExtractJwt,
  { _findByUserRut } = require("../controllers/users");

module.exports = new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY,
    ignoreExpiration: false,
  },
  async (jwt_payload, done) => {
    const user = await _findByUserRut(jwt_payload.rut);
    console.log(jwt_payload)

    if(!user) return done(null,false,'Usuario no logeado (?)')

    return done(null, {
        id: user.id,
        rut: user.rut,
        nombre_completo: user.nombre_completo
    })
  }
);
