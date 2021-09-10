import User from '../models/User.model';
import nodemailer from 'nodemailer';




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

    let mail_options = {
        from: 'ArRoomMJT',
        to: 'arroom.it@gmail.com',
        subject: 'Bienvenido a la aplicación',
        html: `
            <table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="#2d3436" bgcolor="#2d3436">
                <tr height="200px">  
                    <td bgcolor="" width="600px">
                        <h1 style="color: #fff; text-align:center">Bienvenido</h1>
                        <p  style="color: #fff; text-align:center">
                            <span style="color: #e84393"></span> 
                            a la aplicación
                        </p>
                    </td>
                </tr>
                <tr bgcolor="#fff">
                    <td style="text-align:center">
                        <p style="color: #000">¡Un mundo de workspaces a su disposición!</p>
                    </td>
                </tr>
            </table>
        `
    };

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




export { getUser,
         deleteUser,
         editUser,
         sendEmail} 