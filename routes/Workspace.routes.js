import express from 'express';
import {workspaceGet, workspacePost, workspacePut,workspaceDelete,workspaceGetById} from '../controllers/workspace.controller';
import upload from '../middlewares/file.middleware';



const router = express.Router();

router.get('/',workspaceGet);

router.post('/create', [upload.upload.single('photo'), upload.uptoCloudinary], workspacePost);

router.put('/edit',workspacePut);

router.delete('/delete/:id',workspaceDelete);

router.get('/:id',workspaceGetById);

export {router};