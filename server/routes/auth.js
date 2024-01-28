const express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  jwt = require("jsonwebtoken")
  
const bcrypt = require("bcrypt");

const modeloUsuario = require("../models").Usuario;
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("xe", "jorge", "duoc", {
  host: "127.0.0.1",
  dialect: "oracle", // Elige el dialecto correspondiente a tu base de datos (puede ser 'postgres', 'mysql', 'sqlite', etc.)
});

router.post("/register", async (req, res) => {
  try {
    // Encriptar la contraseña utilizando bcrypt
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await modeloUsuario.create({
      ...req.body,
      password: hashedPassword,
      cod_rol: 3
    });

    // Crear un objeto con la información que deseas enviar al frontend
    const userToFrontend = {
      rut: user.rut,
      dv: user.dv,
      nombres: user.nombres,
      apellidos: user.apellidos,
      fecha_nacimiento: user.fecha_nacimiento,
      numero: user.numero_telefono,
      correo: user.correo,
      cod_rol: user.cod_rol,
    };

    const token = jwt.sign(userToFrontend, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    return res.status(201).json({
      user: userToFrontend,
      status: "success",
      message: `El usuario fue creado con éxito`,
      token: token,
    });
  } catch (error) {
    return res.status(500).json(error.message);
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
    // Buscar el usuario por rut utilizando Sequelize
    const foundUser = await modeloUsuario.findOne({
      where: {
        rut: decodedToken.rut,
      },
    });

    if (!foundUser) {
      return res.sendStatus(401);
    }
    return res.json(decodedToken);
  });
});

module.exports = router;
