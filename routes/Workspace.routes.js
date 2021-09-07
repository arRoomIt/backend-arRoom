import express from 'express';
import {workspaceGet, workspacePost, workspacePut,workspaceDelete,workspaceGetById} from '../controllers/Workspace.controller';


const router = express.Router();

router.get('/',workspaceGet);

router.post('/create',workspacePost);

router.put('/create',workspacePut);

router.delete('/delete',workspaceDelete);

router.get('/:id',workspaceGetById);

export {router};