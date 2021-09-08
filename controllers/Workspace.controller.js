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
            hasAirCon,
            hasAirHeating,
            hasInternet,
            price,
            publishedAt,
            isBooked,
            reviews,
            reservations
        } = req.body;


        const newWorkspace = new Workspace(
            {
                title,
                roomType,
                totalOccupancy,
                summary,
                hasAirCon: hasAirCon === "true"? true: false,
                hasAirHeating:hasAirHeating === "true"? true: false,
                hasInternet:hasInternet === "true"? true: false,
                price,
                publishedAt,
                isBooked: isBooked === "true"? true: false,
                images: req.fileUrl ? req.fileUrl : 'https://utopicus.es/sites/default/files/styles/gallery/public/paragraph/block_gallery_item/image/2021-01/Utopicus%20Francisco%20Silvela_zona%20fix%20%282%29.jpg?h=8f9cfe54&itok=7RYy6dL6',
                reviews,
                reservations
            }
        );

        const createdWorkspace = await newWorkspace.save();
        return res.status(200).json(createdWorkspace);

    } catch (error) {
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

export {
    workspaceGet,
    workspacePost,
    workspacePut,
    workspaceDelete,
    workspaceGetById
}