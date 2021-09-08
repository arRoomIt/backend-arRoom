import express from 'express';
import {registerPost,
    loginPost,
    logoutPost,
    checkSession} from '../controllers/auth.controller';


const router = express.Router();

router.post('/register', registerPost);

router.post('/login', loginPost);

router.post('/logout', logoutPost);

router.get('/checkSession',checkSession);

export {router};