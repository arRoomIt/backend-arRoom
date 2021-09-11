const mongoose = require('mongoose');

const { Schema } = mongoose;
//TODO: cambiar el nombre del campo "reviews" a ""
//TODO: campo para almacenar id de review de host --> "hostsReview: [{}]"
//TODO: campo para almacenar id de workspace donde ha estado previamente --> "visited: [{ObjectId, ref: wok}]"
const userSchema = new Schema ( 
    { 
        email:{type: String , required: true},
        password:{type: String , required: true},
        name:{type: String , required: true},
        phoneNumber:{type: String},
        role:{type: String , required: true, default: "user", enum: ['user','host','admin'] },
        isHost:{type: Boolean , required:true, default: false},
        profileImage:{type: String },
        hostsReview:[{type: mongoose.Types.ObjectId, ref:"Review",default: []}], //aqui se guardan los review de host hacia este user
        reservations:[{type: mongoose.Types.ObjectId, ref:"Reservation"}]
    },
        {timestamps:true}
);

const User = mongoose.model("User", userSchema);

export default User;