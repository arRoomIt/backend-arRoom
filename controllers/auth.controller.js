import passport from 'passport';
require("../auth/google.strategy")

const registerPost = (req, res, next) => {

    const done = (err,user) => {
        if(err) return next(err);
        req.login(user, (error) => (error ? next(error) : res.json(user)));
    }

    passport.authenticate("register", done)(req);

}

const loginPost = (req, res, next) => {
    const done = (error, user) => {
      if (error) return next(error);
  
      req.login(user, (error) => (error ? next(error) : res.json(user)));
    };
  
    passport.authenticate("login", done)(req);
  };
  
  const logoutPost = (req, res, next) => {
  
    if(req.user){
      console.log("Cerrando session")
      req.logout();
      req.session.destroy(()=>{
        res.clearCookie('connect.sid');
        return res.status(200).json("Session cerrado correctamente");
      }); 
    }else{
      return res.status(404).json("No hay session de user");
    }
  }
  
  
  const checkSession = (req, res, next) => {
  
    if(req.user){
      let userRegister = req.user;
      userRegister.password = null;
  
      return res.status(200).json(userRegister);
    }else{
      return res.status(401).json({message: 'No user found'})
    }
  
  }

  // const facebookLogin = () =>{passport.authenticate("facebook");
  // }
  // const facebookCallback = () =>{passport.authenticate('facebook', { succesRedirect: '/reservation',failureRedirect: '/login' })
  // }

  //const googleLogin = () =>{passport.authenticate('google', { scope: ['profile'] })};

//   const googleCallback = () =>{
//     passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   };
// }
  
export {
    registerPost,
    loginPost,
    logoutPost,
    checkSession,
  }