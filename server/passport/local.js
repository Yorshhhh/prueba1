const LocalStrategy = require("passport-local").Strategy;
const { _findByUserRut } = require("../controllers/users");
const bcrypt = require("bcrypt");

module.exports = new LocalStrategy(
  { usernameField: "rut", session: false }, // Aquí especifica el campo de nombre de usuario como 'rut'
  async (rut, password, done) => {
    try {
      const user = await _findByUserRut(rut); // Cambia rut_ a user, ya que es el usuario que estás buscando
      if (!user) {
        return done(null, false, "Usuario incorrecto");
      }

      const match = bcrypt.compareSync(password, user.password);

      if (!match) {
        return done(null, false, "Contraseña incorrecta"); // Cambia "true" a "false" para indicar una autenticación fallida
      }
      return done(null, {
        rut: user.rut,
        nombre: user.nombre_completo,
        telefono: user.numero_telefono,
        correo: user.correo,
        rol: user.rol,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
      }); // Pasar el usuario autenticado a la función done
    } catch (e) {
      return done(e);
    }
  }
);
