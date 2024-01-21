const express = require("express"),
  router = express.Router(),
  { _findAll } = require("../controllers/users"),
  auth = require("../middlewares/authorization");

router.get("/", auth, async (req, res) => {
  console.log('Finalmente al pasar por el middleware, donde se verifica si el usuario existe')
  console.log('al hacerse una peticion a esta ruta')
  console.log('se accede a la informacion del usuario y se hace una validacion a nivel de rol de usuario')
  if (req.body.user.rol === "admin") {
    try {
      console.log('El usuario esta autorizado')
      const users = await _findAll();
      return res.status(200).json(users);
    } catch (e) {
      return res.status(500).json(e.message);
    }
  } else {
    return res.status(401).json({message: "Usuario no autorizado"});
  }
});
module.exports = router;
