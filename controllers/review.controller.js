import Review from '../models/Review.model';

 const reviewGet = async(req, res, next)=>{
    try {
        const reviews = await Review.find();
        return res.status(200).json(reviews);

    } catch (error) {
        const myError = new Error("No se han encontrado los comentarios");
        return next(myError);
    }
    
 }

 const reviewCreate = async(req, res, next)=>{

    try {

        const {rating, comment }= req.body;
        const newComment = new Review({rating, comment});
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
    reviewGetById
}