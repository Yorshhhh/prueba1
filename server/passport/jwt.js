const JWTStrategy = require("passport-jwt").Strategy,
  ExtractJWT = require("passport-jwt").ExtractJwt
//AQUI IBA UN FINDBYEMAIL
const modeloUsuario = require('../models').Usuario
module.exports = new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY,
    ignoreExpiration: false,
  },
  async (jwt_payload, done) => {
    //AQUI BUSCAMOS AL USUARIO X SU CORREO USANDO: jwt_payload.correo
    const user = await modeloUsuario.findOne({
      where: {
        correo: jwt_payload.correo,
      },
    });

    if (!user) return done(null, false, "Usuario no logeado");


    console.log('1)passport/jwt')
    console.log('Aqui se verifica el JWT que se envía en la petición hacia el servidor')
    console.log('y se devuelve la informacion necesaria al Front End')
    console.log('quien es el que pasa por aqui?')
    console.log(jwt_payload)

    return done(null, {
      rut: user.rut,
      nombres: user.nombres,
      apellidos: user.apellidos,
      numero_telefono: user.numero_telefono,
      correo: user.correo,
      cod_rol: user.cod_rol,
    });
  }
);
