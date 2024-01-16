const express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  jwt = require("jsonwebtoken"),
  {
    _create,
    _findByUserRut,
    _findByUserEmail,
  } = require("../controllers/users");

router.post("/register", async (req, res) => {
  try {
    //Preguntamos si el RUT del USUARIO se encuentra disponible
    const foundUser = await _findByUserRut(req.body.rut);
    if (foundUser) {
      return res
        .status(400)
        .json(`El usuario con rut ${foundUser.rut} ya existe`);
    }
    //Preguntamos si el CORREO del USUARIO se encuentra disponible
    const foundEmail = await _findByUserEmail(req.body.correo);
    if (foundEmail) {
      return res.status(400).json("Correo en uso, elija otro");
    }

    const user = await _create(req.body);
    console.log(user)
    
    const token = jwt.sign(
      {
        id: user.id,
        rut: user.rut,
        nombre: user.nombre_completo,
        numero: user.numero_telefono,
        correo: user.correo,
        rol: user.rol,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRATION,
      }
    );

    return res.status(201).json({
      user,
      status: "success",
      message: `El usuario63 fue creado con éxito`,
      token: token,
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

      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(400).json({
          message: "Usuario o contraseña incorrecta desde el servidor!",
        });
      }

      const token = jwt.sign(user, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRATION,
      });

      return res.status(200).json({
        token,
        expiresIn: process.env.JWT_EXPIRATION,
        user,
        message: "Usuario autenticado correctamente!",
      });
    }
  )(req, res, next);
});

router.get("/verifytoken", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.send(false);
  }

  jwt.verify(token, process.env.SECRET_KEY, async (error, decodedToken) => {
    if (error) {
      return res.send(false);
    }
    const foundUser = await _findByUserRut(decodedToken.rut);
    if (!foundUser) {
      return res.sendStatus(401);
    }
    return res.json(decodedToken);
  });
});

module.exports = router;
