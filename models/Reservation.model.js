import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
    start: { type: Date, required: true },
    end: { type: Date, required: true},
    price: { type: Number, required: true },
    total: { type: Number }   
}, 
{ timestamps: true }
);

const Reservation = mongoose.model('Reservation', ReservationSchema);

export default Reservation;