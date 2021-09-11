import Workspace from '../models/Workspace.model';

const workspaceGet = async(req, res, next) =>{

    try{
        const workspace = await Workspace.find();
        
        if(workspace.length === 0){
           const error = new Error("Coleccion vacía");
           error.status = 404;
           throw error;
        }
        
        return res.status(200).json(workspace);

    }catch(err){
        return next(err);
    }   
}

const workspacePost = async(req, res, next) =>{

    try {
        
        const {
            title,
            roomType,
            totalOccupancy,
            summary,
            direction,
            latitude,
            longitude,
            hasAirCon,
            hasAirHeating,
            hasInternet,
            price,
            publishedAt,
            isBooked,
        } = req.body;


        const newWorkspace = new Workspace(
            {
                title,
                roomType,
                totalOccupancy,
                summary,
                latitude,
                longitude,
                direction,
                hasAirCon: hasAirCon === "true"? true: false,
                hasAirHeating:hasAirHeating === "true"? true: false,
                hasInternet:hasInternet === "true"? true: false,
                price,
                publishedAt: new Date(publishedAt),
                isBooked: isBooked === "true"? true: false,
                images: req.file_url ? req.file_url: '',
            }
        );

        const createdWorkspace = await newWorkspace.save();
        return res.status(200).json(createdWorkspace);

    } catch (error) {
        console.log(error);
        return next(error);
    }
}

const workspacePut = async (req, res) => {

    try {

        const {
            id,
            title,
            roomType,
            totalOccupancy,
            summary,
            latitude,
            longitude,
            direction,
            hasAirCon,
            hasAirHeating,
            hasInternet,
            price,
            publishedAt,
            isBooked,
            reviews,
            reservations
        } = req.body;


        const update = {};

        if(title) update.title = title;
        if(roomType) update.roomType = roomType;
        if(totalOccupancy) update.totalOccupancy = totalOccupancy;
        if(summary) update.summary = summary;
        if(latitude) update.latitude = latitude;
        if(longitude) update.longitude = longitude;
        if(direction) update.direction = direction;
        if(hasAirCon) update.hasAirCon = hasAirCon;
        if(hasAirHeating) update.hasAirHeating = hasAirHeating;
        if(hasInternet) update.hasInternet = hasInternet;
        if(price) update.price = price;
        if(publishedAt) update.publishedAt = publishedAt;
        if(isBooked) update.isBooked = isBooked;
        if(reviews) update.reviews = reviews;
        if(reservations) update.reservations = reservations;

        const updateWorkspace = await Workspace.findByIdAndUpdate( 
            id,
            update,
            { new: true },
        );
        return res.status(200).json(updateWorkspace);

    } catch (error) {
        console.error(error);
        return next(error);
    }
}

const workspaceDelete = async (req, res) => {

    try {
        
        const { id } = req.params;
        const workspace = await Workspace.findByIdAndDelete(id);

        if(!workspace){
            return res.status(404).json("No se ha podido eliminar el workspace");
        }else{
            return res.status(200).json("Se ha eliminado correctamente");
        }
        
    } catch (error) {
        console.error(error);
        return next(error);
    }
}

const workspaceGetById = async (req, res, next) => {

    try {

        const { id } = req.params;
        const workspace = await Workspace.findById(id);

        if(workspace === null || workspace === undefined){
            const error = new Error("Workspace no encontrado");
            error.status = 404;
            throw error;
        }
        
        return res.status(200).json(workspace);
    } catch (error) {
        return next(error);
    }
}

const workspaceFilter = async (req, res, next) => {
    try {
        const isBooked = false;
        const {
            roomType,
            totalOccupancy,
            hasAirCon,
            direction,
            hasAirHeating,
            hasInternet,
            price,
        } = req.body;

        //comprobamos los campos y en caso de tenerlos se filtra workspace con dichos filtros
        const query = {
         ...(roomType && {roomType: {$regex : roomType}}),
         ...(direction && {direction: {$regex : direction}}),
         ...(totalOccupancy && {totalOccupancy: {$gte: totalOccupancy}}),
         ...(hasAirCon && {hasAirCon: hasAirCon}),
         ...(hasAirHeating && {hasAirHeating: hasAirHeating }),
         ...(hasInternet && {hasInternet: hasInternet}),
         ...(price && {$lte: price}),
         ...(isBooked && {isBooked}),
        }

        // console.log("probando filter--->",query);
        
        const workspace = await Workspace.find(query);

        if(workspace !== null && workspace !== undefined && workspace.length !== 0){
            return res.status(200).json(workspace);
        }else{
            return res.status(404).json("No hay workspace que cumplen esos campos");
        }
        
    } catch (error) {
        console.log(error);
        return next(error);
    }
}


const workspaceAddReservation = async(workspaceId, reservationId)=> {

    try {
        
        const workspaceUpdate = await Workspace.findByIdAndUpdate(
            workspaceId,
            {$addToSet: {reservations: reservationId}},
            {new:true}
        )

        return workspaceUpdate;
        
    } catch (error) {
        return next(error);
    }

}

const workspaceAddReview = async(reviewId,workspaceId)=> {

    try {
        const workspaceUpdate = await Workspace.findByIdAndUpdate(
            workspaceId,
            {$addToSet:{reviews: reviewId}},
            {new: true}
        );
        return workspaceUpdate;

    } catch (error) {
        console.log(error);
    }    

}

const workspaceDeleteReview = async(reviewId,workspaceId)=> {

    try {

        const deleteReview = await Workspace.findByIdAndUpdate(
            workspaceId,
            {$pull:{reviews: reviewId}},
            {new: true}
        );
        return deleteReview;
        
    } catch (error) {
        console.log(error);
        return next(error);
    }

}


export {
    workspaceGet,
    workspacePost,
    workspacePut,
    workspaceDelete,
    workspaceGetById,
    workspaceFilter,
    workspaceAddReservation,
    workspaceAddReview,
    workspaceDeleteReview
}