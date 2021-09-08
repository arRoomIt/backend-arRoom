import express from 'express';
import {registerPost,
    loginPost,
    logoutPost,
    checkSession} from '../controllers/auth.controller';

    import{isUser}from '../middlewares/auth.middleware';


const router = express.Router();

router.post('/register', registerPost);

router.post('/login',[isUser], loginPost);

router.post('/logout',[isUser], logoutPost);

router.get('/checkSession',checkSession);

export {router};