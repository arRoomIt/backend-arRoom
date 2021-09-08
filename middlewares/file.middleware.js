import multer from 'multer';
//import path from 'path';
import fs from 'fs';

const path = require('path');

const cloudinary = require('cloudinary').v2;
// import cloudinary from 'cloudinary';

const FILE_EXTENSION = ['image/png', 'image/jpg', 'image/jpeg'];

const storage = multer.diskStorage({
    filename: (req, file, callback) => {
        const fileName = (Date.now() + file.originalname);
        callback(null, fileName);
    },
    destination: (req, file, callback) => {
        const directory = path.join(__dirname, '../public/uploads');
        callback(null, directory);
    },
});

const fileFilter = (req, file, callback) => {
    if(!FILE_EXTENSION.includes(file.mimetype)){
        const error = new Error('Invalid file type');
        error.status = 404;
        return callback(error, true);
    }
    return callback(null, true);
};

const upload = multer({
    storage,
    fileFilter,
});

const uptoCloudinary = async (req, res, next) => {
    
    try {

        cloudinary.config({ 
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true
        });
        
        if(req.file){
            const img = await cloudinary.uploader.upload(req.file.path);
            console.log(img);
            await fs.unlinkSync(req.file.path);
            req.file_url = img.secure_url;
            return next();
        }else{
            return next();
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports =  {upload, uptoCloudinary};

//export default {upload: upload, uptoCloudinary};