import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import {registerPost,
    loginPost,
    logoutPost,
    checkSession,
    facebookLogin,
    facebookCallback,
    googleLogin,
    googleCallback} from '../controllers/auth.controller';

    import{isUser}from '../middlewares/auth.middleware';


const router = express.Router();

router.post('/register', registerPost);

router.post('/login', loginPost);

router.post('/logout',[isUser], logoutPost);

router.get('/checkSession',checkSession);

router.get('/facebook', passport.authenticate("facebook", { scope: ['profile','email'] }))

router.get('/facebook/callback', passport.authenticate('facebook', { succesRedirect: '/reservation',failureRedirect: '/login' } ))

router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }) );

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
function(req, res, next) {
  if(req.user){
    const token = jwt.sign({id: req.user.id}, 'top_secret',{ 
      expiresIn: 60 * 60 * 24,
    })
    res.cookie('rsk', token )
    return next();
  }else{
    res.status(401).json("No estas autorizado");
  }
  
});
router.get(
  "/google/signup",
  passport.authenticate("googleLogin", {scope: ['https://www.googleapis.com/auth/plus.login'], session: false }),
  function (req, res, next) {
    if (req.user) { 
      const token = jwt.sign({id: req.user._id}, 'top_secret', {
        expiresIn: 60 * 60 * 24,
      })
      res.cookie('rfk', token)        
      return next();
    } else {
      res.status(500).json("Algo ha fallado")
    } 
  }
);


export {router};