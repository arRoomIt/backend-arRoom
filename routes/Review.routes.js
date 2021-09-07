 import express from 'express';

 import {reviewGet,reviewCreate,reviewPut,reviewDelete,reviewGetById} from "../controllers/review.controller";

 const routerReview = express.Router();

 routerReview.get('/',reviewGet);

 routerReview.post('/create',reviewCreate);

 routerReview.put('/update',reviewPut);

 routerReview.delete('/delete',reviewDelete);

 routerReview.get('/:id',reviewGetById);

 export default routerReview;