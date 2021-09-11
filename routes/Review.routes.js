 import express from 'express';
 import{isUser, isAdmin,isHost}from '../middlewares/auth.middleware';
 import {
    reviewGet,
    reviewCreate,
    reviewPut,
    reviewDelete,
    reviewGetById,
    reviewUser,
    reviewWorkspace } from "../controllers/review.controller";

 const routerReview = express.Router();

 routerReview.get('/',reviewGet);
//TODO: get de los review de workspace y de user

 routerReview.post('/workspace',[isUser, isAdmin],reviewWorkspace);
//TODO: comentar sobre un usuario siendo un host

 routerReview.post('/user',reviewUser);

 routerReview.post('/create',[isUser, isAdmin, isHost], reviewCreate);

 routerReview.put('/update',[isUser ,isAdmin,isHost],reviewPut);

 routerReview.delete('/delete',[isUser ,isHost, isAdmin],reviewDelete);

 routerReview.get('/:id',reviewGetById);

 export default routerReview;