const express = require("express"),
  router = express.Router();
auth = require("../middlewares/authorization");

const bcrypt = require('bcrypt')

const modeloUsuario = require("../models").Usuario;

router.get("/", auth, async (req, res) => {
  console.log(
    "Finalmente al pasar por el middleware, donde se verifica si el usuario existe"
  );
  console.log("al hacerse una peticion a esta ruta");
  console.log(
    "se accede a la informacion del usuario y se hace una validacion a nivel de rol de usuario"
  );
  //VALIDACION PARA VER LA LISTA DE LOS USUARIOS
  //SOLO SE VISUALIZARAN SI EL ROL DEL USUARIO ES ADMINISTRADOR
  console.log("preguntamos por el Rol del usuario");
  console.log(req.body.user.cod_rol);

  if (req.body.user.cod_rol === 1) {
    try {
      console.log("El usuario esta autorizado");
      const users = await modeloUsuario.findAll();
      return res.status(200).json(users);
    } catch (e) {
      return res.status(500).json(e.message);
    }
  } else {
    return res.status(401).json({ message: "Usuario no autorizado" });
  }
});

router.post("/crear-usuario", auth, async (req, res) => {
  // PREGUNTAMOS POR EL ROL DEL USUARIO
  const userRole = req.body.user.cod_rol;

  // VERIFICAMOS SI EL USUARIO QUE ENVÍA LA PETICIÓN TIENE ROL DE ADMINISTRADOR: 1
  if (userRole === 1) {
    try {
      // PREGUNTAMOS SI EL RUT DEL USUARIO ESTÁ DISPONIBLE
      const rutExist = await modeloUsuario.findOne({
        where: {
          rut: req.body.rut,
        },
      });

      if (rutExist) {
        return res.status(400).json({
          status: "error",
          message: "El rut ingresado ya se encuentra registrado.",
        });
      }

      // PREGUNTAMOS SI EL CORREO DEL USUARIO ESTÁ DISPONIBLE
      const correoExist = await modeloUsuario.findOne({
        where: {
          correo: req.body.correo,
        },
      });

      // SI EXISTE LE NOTIFICAMOS AL USUARIO
      if (correoExist) {
        return res.status(400).json({
          status: "error",
          message: "El correo ingresado ya se encuentra registrado.",
        });
      }

      // CIFRAMOS LA CONTRASEÑA
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // UNA VEZ VALIDADO TODO, CREAMOS EL USUARIO
      const user = await modeloUsuario.create({
        ...req.body,
        password: hashedPassword,
      });

      return res.status(201).json({
        status: "success",
        message: `El usuario fue creado con éxito.`,
        user: {
          rut: user.rut,
          correo: user.correo,
          cod_rol: user.cod_rol,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: "error",
        message: "Error interno del servidor.",
      });
    }
  } else {
    return res.status(403).json({
      status: "error",
      message:
        "Permiso denegado. Solo los administradores pueden crear usuarios.",
    });
  }
});

module.exports = router;
