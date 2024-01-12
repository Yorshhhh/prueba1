const passport = require("passport");

module.exports = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, function (err, user, info) {
    Object.assign(req.body, { user: user });

    console.log("2)Tambien pasas por aqui? que tienes en user");
    console.log(user);
    if (err) return res.status(500).json(err);
    if (!user) return res.status(401).json(info);
    next();
  })(req, res, next);
};
