const LocalStrategy = require("passport-local").Strategy;
const { _findByUserEmail } = require("../controllers/users");
const bcrypt = require("bcrypt");

module.exports = new LocalStrategy(
  { usernameField: "correo", session: false }, // Aquí especifica el campo de nombre de usuario como "correo"
  async (correo, password, done) => {
    try {
      const user = await _findByUserEmail(correo); 
      if (!user) {
        return done(null, false, "Correo ingresado no se encuentra registrado");
      }

      const match = bcrypt.compareSync(password, user.password);

      if (!match) {
        return done(null, false, "Contraseña ingresada incorrecta"); // Cambia "true" a "false" para indicar una autenticación fallida
      }
      
      return done(null, {
        rut: user.rut,
        nombre_completo: user.nombre_completo,
        numero_telefono: user.numero_telefono,
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
