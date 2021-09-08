const mongoose = require('mongoose');

const { Schema } = mongoose;

const reviewSchema = new Schema (
    {
        rating: { type: Number , required: true},
        comment: { type: String , required: true},
        

    },
    {timestamps:true}
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
