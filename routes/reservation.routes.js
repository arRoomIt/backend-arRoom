import express from 'express';
import{isUser, isAdmin}from '../middlewares/auth.middleware';
import { getReservation, getReservationId, createReservation, editReservation,deleteReservation } from '../controllers/reservation.controller';

const routerReservation = express.Router();

routerReservation.get('/', getReservation);
//TODO: añadir direccion al modelo de Workspace
routerReservation.post('/create',[isUser, isAdmin], createReservation);

routerReservation.put('/edit',[isUser],[isAdmin], editReservation);

routerReservation.delete('/delete',[isUser],[isAdmin], deleteReservation);

routerReservation.get('/:id', getReservationId);


export default routerReservation;