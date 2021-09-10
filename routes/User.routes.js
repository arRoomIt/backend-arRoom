import express from 'express';
import { getUser, deleteUser, editUser } from '../controllers/user.controller';

const routerUser = express.Router();

//TODO: comentar sobre un usuario siendo un host
routerUser.get('/', getUser);

routerUser.put('/edit', editUser);

routerUser.delete('/delete', deleteUser);


export default routerUser;