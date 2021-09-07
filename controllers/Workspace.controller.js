import Workspace from '../models/Workspace.model';

const workspaceGet = async(req, res, next) =>{

    try{
        const workspace = await Workspace.find();
        
        if(workspace.length === 0){
            return res.status(404).json("Coleccion vacia");
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

        if(title) update = title;
        if(roomType) update = roomType;
        if(totalOccupancy) update = totalOccupancy;
        if(summary) update = summary;
        if(hasAirCon) update = hasAirCon;
        if(hasAirHeating) update = hasAirHeating;
        if(hasInternet) update = hasInternet;
        if(price) update = price;
        if(publishedAt) update = publishedAt;
        if(isBooked) update = isBooked;
        if(reviews) update = reviews;
        if(reservations) update = reservations;

        const updateWorkspace = await Workspace.findByIdAndUpdate(
            
            id,
            update,
            { new: true },
        );
        return res.status(200).json(updateWorkspace);

    } catch (error) {
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
        return next(error);
    }
}

const workspaceGetById = async (req, res) => {

    try {

        const { id } = req.params;
        const workspace = await Workspace.findById(id);

        if(workspace.length === 0){
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