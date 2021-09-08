import Reservation from '../models/Reservation.model';



const getReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.find();
        if(reservation.length === 0){
            const error = new Error("No hay reservas");
            error.status = 404;
            throw error;
         }
         return res.status(200).json(reservation);
        
    } catch (error) {
        return next(error);
    }
};


const getReservationId = async (req, res, next) => {
    const { id } = req.params;
    try {
        const reservation = await Reservation.findById(id);

        if(reservation === null || reservation === undefined){
            const error = new Error("Reservation no encontrado");
            error.status = 404;
            throw error;
        }
        return res.status(200).json(reservation);
        
    } catch (error) {
        return next(error);
    }
};



const createReservation = async (req, res, next) => {
    try {
        const { start, end, price, total } = req.body;
        const newReservation = new Reservation({ 
            start, 
            end, 
            price, 
            total 
        });

        const createReservation = await newReservation.save();
        return res.status(200).json(createReservation);
        
    } catch (error) {
        return next(error);
    }
};



const editReservation = async (req, res, next) => {
    try {
        const { id, start, end, price, total } = req.body;
        const update = {};
        if(start) update.start = start;
        if(end) update.end = end;
        if(total) update.total = total;
        if(price) update.price = price;

        const updateReservation = await Reservation.findByIdAndUpdate(
            id, 
            update,
            { new: true }
        );
        return res.status(200).json(updateReservation);

    } catch (error) {
        return next(error);
    }
};


const deleteReservation = async (req, res, next) => {
    const { id } = req.body;
    try {
        const deleted = await Reservation.findByIdAndDelete(id);

        if(!deleted) {
            return res.status(404).json('La reserva no existe');
        }else{
            return res.status(200).json('Reservation deleted');
        }
        
    } catch (error) {
       return next(error); 
    }
};


export { getReservation, 
         getReservationId, 
         createReservation, 
         editReservation,
         deleteReservation }

