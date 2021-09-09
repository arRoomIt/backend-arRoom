 import express from 'express';
 import{isUser, isAdmin,isHost}from '../middlewares/auth.middleware';
 import {reviewGet,reviewCreate,reviewPut,reviewDelete,reviewGetById} from "../controllers/review.controller";

 const routerReview = express.Router();

 routerReview.get('/',reviewGet);

 routerReview.post('/create',[isUser],[isAdmin],[isHost], reviewCreate);

 routerReview.put('/update',[isUser],[isAdmin],[isHost],reviewPut);

 routerReview.delete('/delete',[isUser],[isAdmin],[isHost],reviewDelete);

 routerReview.get('/:id',reviewGetById);

 export default routerReview;