import express from 'express';

import dotenv from 'dotenv';
dotenv.config();

//routes
import {router as routerWorkspace} from './routes/Workspace.routes';


import connect from './utils/db';
connect();


const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/workspace',routerWorkspace);


//para controlar paginas que no existe
app.use('*',(req,res,next) => {
    const error = new Error('Página no encontrada');
    return res.status(404).json(error.message);
})

app.use((error,req,res,next) => {
    return res.status(error.status || 500).json(error.message || 'Unexpected error');
})


app.listen(PORT,() => {
    console.log(`Server runnig in http://localhost:${PORT}`);
});