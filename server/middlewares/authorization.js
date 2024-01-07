const passport = require('passport');

module.exports = (req,res,next) => {
  passport.authenticate('jwt', { session: false }, function(err,user,info){
  //  console.log({req})
    Object.assign(req.body,{user:user});
   // req.user = user
/*     console.log("USER desde middlewares/authorization.js: ",user)
    console.log("REQ.BODY/REQ.USER desde middlewares/authorization.js: ", req.body.user)
     */
    console.log('2)Tambien pasas por aqui? que tienes en user')
    console.log(user)
    if(err) return res.status(500).json(err)
    if(!user) return res.status(401).json(info)
  next()
  })(req,res,next)
};
