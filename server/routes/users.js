const express = require("express"),
  router = express.Router(),
  { _findAll } = require("../controllers/users"),
  auth = require("../middlewares/authorization");

router.get("/", auth, async (req, res) => {

  console.log("3) REQ.BODY desde routes/users.js",req.body.user.rol);

  if (req.body.user.rol === "admin") {
    try {
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
