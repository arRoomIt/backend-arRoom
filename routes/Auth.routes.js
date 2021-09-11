import express from 'express';
import passport from 'passport';
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

router.post('/login',[isUser], loginPost);

router.post('/logout',[isUser], logoutPost);

router.get('/checkSession',checkSession);

router.get('/facebook', passport.authenticate("facebook", { scope: ['profile','email'] }))

router.get('/facebook/callback', passport.authenticate('facebook', { succesRedirect: '/reservation',failureRedirect: '/login' } ))

router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }) );

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
function(req, res) {
  res.redirect('/');
});



export {router};