import express from 'express';
import {workspaceGet, workspacePost, workspacePut,workspaceDelete,workspaceGetById, workspaceFilter} from '../controllers/workspace.controller';
// import upload from '../middlewares/file.middleware';
import{isHost, isAdmin}from '../middlewares/auth.middleware';
const { upload, uptoCloudinary } = require('../middlewares/file.middleware');



const router = express.Router();

router.get('/',workspaceGet);

router.post('/create',[isHost , isAdmin], [upload.single('images'), uptoCloudinary], workspacePost);

router.put('/edit',[isHost],[isAdmin],workspacePut);

router.delete('/delete/:id',[isHost],[isAdmin],workspaceDelete);

router.get('/filter',workspaceFilter);

router.get('/:id',workspaceGetById);

export {router};