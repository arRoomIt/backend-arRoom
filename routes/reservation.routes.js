import express from 'express';
import { getReservation, getReservationId, createReservation, editReservation,deleteReservation } from '../controllers/reservation.controllers';

const routerReservation = express.Router();



routerReservation.get('/', getReservation);

routerReservation.post('/create', createReservation);

routerReservation.put('/edit', editReservation);

routerReservation.delete('/delete', deleteReservation);

routerReservation.get('/:id', getReservationId);


export default routerReservation;