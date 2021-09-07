import Reservation from '../models/Reservation.model';



const getReservation = async (req, res, next) => {
    try {
        const reserervations = await Reservation.find();
        return res.status(200).json(reserervations);
        
    } catch (error) {
        return next(error);
    }
};


const getReservationId = async (req, res, next) => {
    const { id } = req.params;
console.log('id línea 18');
    try {
        const reservation = await Reservation.findById(id);

        if(reservation){
            return res.status(200).json(reservation);
        }else{
            const error = new Error('No se encuentra la reserva con la id indicada');
            error.status = 404;
            throw error;
        }
        
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

