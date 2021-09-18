import User from '../models/User.model';
import nodemailer from 'nodemailer';
import mail_options from '../utils/utils.User';

const {cloudinary} = require('../config/cloudinary');

const getUser = async (req, res, next) => {
    try {
        const exitUser = await User.find();
        if(exitUser.length === 0) {
            const error = new Error("El usuario no existe en nuestra base de datos");
            error.status = 404;
            throw error;
        }
        return res.status(200).json(exitUser);
        
    } catch (error) {
        return next(error);
    }
};



const sendEmail = async (req, res, next) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAILUSER,
            pass: process.env.MAILPSSWD
        }
    });

    try {
        transporter.sendMail(mail_options, (error, info) => {
            if(error) {
                return res.status(500).json(error.message);
            }else{
                return res.status(200).json('El correo se envió correctamente');
            }
        });
        
    } catch (error) {
        return next(error);
    }
   
};




const editUser = async (req, res, next) =>{
    try {
        const { id, email, password, name, phoneNumber, profileImage, isHost } = req.body;
        const update = {};
        if(email) update.email = email;
        if(password) update.password = password;
        if(name) update.name = name;
        if(phoneNumber) update.phoneNumber = phoneNumber;
        if(profileImage) update.profileImage = profileImage;
        if(isHost) update.isHost = isHost;

        const updateUser = await User.findByIdAndUpdate(
            id,
            update,
            { new: true }
        );
        return res.status(200).json(updateUser);

    } catch (error) {
        return next(error);
    }
};


const postUpload = async (req, res, next) =>{

    try {
        const {image,userId} = req.body;

        const upload = await cloudinary.uploader.upload(image);
        const secureRute = upload.secure_url;

        const update = {
            profileImage: secureRute,
        }

        const updateUser = await User.findByIdAndUpdate(
            userId,
            update,
            {new: true},
        );
        
        res.status(200).json(updateUser);
        
    } catch (error) {
        console.log(error);
        return next(error);
    }
}


const deleteUser = async (req, res, next) => {
    const { id } = req.body;
    try {
        const deleted = await User.findByIdAndDelete(id);

        if(!deleted){
            return res.status(404).json('El usuario no existe en nuestra base de datos');    
        }else{
            return res.status(200).json('Usuario borrado');
        }
    } catch (error) {
        return next(error);
    }
};



const userAddReservation = async (userId, reservationId) => {

    try {

      const userUpdate = await User.findByIdAndUpdate(
          userId,
          {$addToSet: {reservations: reservationId}},
          {new: true}
      )

      return userUpdate;    
    
    } catch (error) {
        console.log(error);
    }

}

const userAddReview = async(reviewId,reciverUserId) => {

    try {
        
        const userUpdate = await User.findByIdAndUpdate(
            reciverUserId,
            {$addToSet:{hostsReview: reviewId}},
            {new: true}
        );
        return userUpdate; 

    } catch (error) {
        console.log(error);
        return next(error);
    }
}

const userDeleteReview = async(reviewId,reciverUserId) => {

    try {
        
       const deleteReview = await User.findByIdAndUpdate(
            reciverUserId,
           {$pull: {hostsReview: reviewId }},
           {new: true}
       );
       return deleteReview; 

    } catch (error) {
        console.log(error);
        return next(error);
    }

}


export { getUser,
         deleteUser,
         editUser,
         sendEmail,
         userAddReservation,
         userAddReview,
         postUpload,
         userDeleteReview} 
