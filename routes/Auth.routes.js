import express from 'express';

const router = express.Router();

router.post('/register', controller.registerPost);

router.post('/login', controller.loginPost);

router.post('/logout', controller.logoutPost);

router.get('/checkSession',controller.checkSession);

export default router;