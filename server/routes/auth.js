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
    const foundUser = await _findByUserRut(req.body.rut);
    if (foundUser) {
      return res
        .status(400)
        .json(`El usuario con rut ${foundUser.rut} ya existe`);
    }

    const foundEmail = await _findByUserEmail(req.body.correo);
    if (foundEmail) {
      return res.status(400).json("Correo en uso, elija otro");
    }

    const user = await _create(req.body);

    const token = jwt.sign(user, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
    3;
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

      if (err) {
        return next(err);
      }
      if (!user) {
        return res
          .status(400)
          .json({
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
  const token = req.headers.authorization.split(" ")[1]

  if (!token) {
    return res.send(false);
  }
  
  console.log(token);

  jwt.verify(token, process.env.SECRET_KEY, async (error, decodedToken) => {
    if (error) {
      return res.send(false);
    }
    const foundUser = await _findByUserRut(decodedToken.rut);
    if(!foundUser){
      return res.sendStatus(401)
    }
    return res.json(decodedToken)
  });
});

module.exports = router;
