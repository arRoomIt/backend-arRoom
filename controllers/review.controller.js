import Review from '../models/Review.model';

import { workspaceAddReview } from './Workspace.controller';

import { userAddReview } from './user.controller';

 const reviewGet = async(req, res, next) => {
    try {
        const reviews = await Review.find();
        if(reviews.length===0){
            const error = new Error("La coleccion esta vacia");
            error.status = 404;
            throw error;

        }
        return res.status(200).json(reviews);

    } catch (error) {
        const myError = new Error("No se han encontrado los comentarios");
        return next(myError);
    }

 }

 const reviewWorkspace = async (req, res, next)=>{

    try {
        
        const {rating, comment, author, workspaceId} = req.body;

        const newComment = new Review(
            { 
                rating, 
                comment,
                date: new Date(), 
                author 
            }
        );

        //agregar el review en el workspace-->
        const addReviewWorkspace = await workspaceAddReview(newComment.id,workspaceId);

        if(addReviewWorkspace !== null && addReviewWorkspace !== undefined){

            newComment.workspace = addReviewWorkspace.id;
            const createdReview = await newComment.save();
            return res.status(200).json(createdReview);
        }
        return res.status(500).json("Error al crear le review");

    } catch (error) {
        console.log(error);
        return next(error);
    }

 }


 const reviewUser = async(req, res, next)=>{

    console.log("reviewUser-->")

    try {
        const {rating, comment, author, reciverUserId} = req.body;
        
        const newComment = await Review (
            { 
                rating, 
                comment,
                date: new Date(), 
                author
            }
        );

        console.log(newComment);
        //agregar el review al user
        const addReviewUser = await userAddReview(newComment.id,reciverUserId);
        console.log(addReviewUser);
        
        if(addReviewUser !== null && addReviewUser !== undefined) {
            newComment.reciverUserId = reciverUserId;
            const createdReview = await newComment.save();
            console.log(createdReview);
            return res.status(200).json(createdReview);
        }
        return res.status(500).json("Error al crear review");

    } catch (error) {
        console.log(error);
        return next(error);
    }
 }

 const reviewCreate = async(req, res, next)=>{

    try {

        const {rating, comment, author }= req.body;
        const newComment = new Review({rating, comment,date: new Date(), author});
        const createComment = await newComment.save();
        return res.status(200).json(createComment);
        
    } catch (error) {
        const myError = new Error("No se ha podido crear el comentario");
        return next(myError);
    }
}

const reviewPut = async(req, res, next)=>{

    try {
        const {id,rating,comment}= req.body;
        const update={};
        if(rating) update.rating=rating;
        if(comment)update.comment=comment;

        const updateComment = await Review.findByIdAndUpdate(
            id,update,{new:true});
            return res.status(200).json(updateComment);
    } catch (error) {
        const myError = new Error("No se ha podido editar el comentario");
        return next(myError);
    }

 }

 const reviewDelete = async(req, res, next)=>{

    const {id} = req.body;
    try {
        const reviewDelete = await Review.findByIdAndDelete(id);
        console.log(reviewDelete);

        return res.status(200).json("Se elimino correctamente");
    } catch (error) {
        const myError = new Error("No se ha podido eliminar el comentario");
        return next(myError);
    }
 }

 const reviewGetById = async(req, res, next)=>{
    const {id} = req.params;
    try {
        const review = await Review.findById(id);
        if(review === null || review === undefined){
            const error = new Error("Review no encontrado");
            error.status = 404;
            throw error;
        }
        
        return res.status(200).json(review);
    } catch (error) {
       const myError = new Error("No se ha encontrado el comentario con esa id");
       return next(myError);
    }
}

export{
    reviewGet,
    reviewCreate,
    reviewPut,
    reviewDelete,
    reviewGetById,
    reviewWorkspace,
    reviewUser
}