import express from 'express';
import { getUser, deleteUser, editUser, sendEmail } from '../controllers/user.controller';


const routerUser = express.Router();


routerUser.get('/', getUser);

routerUser.put('/edit', editUser);

routerUser.post('/send-email', sendEmail);

routerUser.delete('/delete', deleteUser);


export default routerUser;