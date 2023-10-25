const express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  jwt = require("jsonwebtoken"),
  { _create, _findByUserRut } = require("../controllers/users");

router.post("/register", async (req, res) => {
  try {
    const foundUser = await _findByUserRut(req.body.rut);
    if (foundUser) {
      console.log("que esta pasando aqui");
      return res
        .status(400)
        .json(`El usuario con rut ${foundUser.rut} ya existe`);
    }
    const user = await _create(req.body);

    return res.status(201).json({
      status: "success",
      message: `El usuario ${user.nombre_completo} fue creado con éxito`,
    });
  } catch (e) {
    return res.status(500).json(e.message);
  }
});

router.post("/login", async (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    function (err, user, info) {
      //LA VARIABLE "user" recibe toda la informacion del usuario
      //Necesito conseguir la variable "rol" para validar sus privilegios
      console.log("Rol del usuario: ",user.rol);

      if (err) {
        return next(err);
      }
      if (!user) {
        console.log("Rut de usuario no existe");
        return res
          .status(400)
          .json({ message: "El rut del usuario ingresado no existe" });
      }
      const token = jwt.sign(user, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRATION,
      });
      //AQUI RECIBO EN "REQ" EL RUT,PASSWORD DEL USUARIO
      //QUE INTENTA LOGEARSE
/*       console.log("BODY DEL REQUEST:",req.body);
      console.log(user) */
      return res.status(200).json({
        token,
        expiresIn: process.env.JWT_EXPIRATION,
        user,
        message: "Usuario autenticado correctamente!",
      });
    }
  )(req, res, next);
});

module.exports = router;
