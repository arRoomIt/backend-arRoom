import mongoose from 'mongoose';

const {Schema} = mongoose;
//TODO: añadir direccion para el workspace
const workspaceSchema = new Schema(
    {
        title:{type: String, required: true},
        roomType: {type: String, required: true},
        totalOccupancy: {type: Number, required: true}, 
        summary: {type: String, required: true},
        latitude: {type: Number},
        longitude: {type: Number},
        direction: {type: String, required: true},
        hasAirCon: {type: Boolean, required: true},
        hasAirHeating: {type: Boolean, required: true},
        hasInternet: {type: Boolean, required: true},
        price: {type: Number, required: true},
        publishedAt: {type: Date},
        isBooked:{type: Boolean},
        images: [{type:String}],
        reviews: [{type: mongoose.Types.ObjectId, ref: 'Review'}],
        reservations: [{type: mongoose.Types.ObjectId, ref:'Reservation'}]
    },
    {timestamps: true}
);

const Workspace = mongoose.model('Workspace',workspaceSchema);

export default Workspace;