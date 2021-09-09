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
        phoneNumber:{type: String , required: true},
        role:{type: String , required: true, default: "user", enum: ['user', 'admin'] },
        isHost:{type: Boolean , required:true},
        profileImage:{type: String },
        reviews:[{type: mongoose.Types.ObjectId, ref:"Review"}],
        reservations:[{type: mongoose.Types.ObjectId, ref:"Reservation"}]
    },
        {timestamps:true}
);

const User = mongoose.model("User", userSchema);

export default User;