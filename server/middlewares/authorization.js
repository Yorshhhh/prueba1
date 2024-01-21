const passport = require("passport");

module.exports = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, function (err, user, info) {
    Object.assign(req.body, { user: user });

    console.log("2)mensaje desde: middlewares/authorization")
    console.log('Aqui se verifica cada vez que se envia una solicitud a una ruta protegida')
    console.log('Se obtiene la informacion del usuario que realiza esta solicitud')
    console.log(user)

    if (err) return res.status(500).json(err);
    if (!user) return res.status(401).json(info);
    next();
  })(req, res, next);
};
