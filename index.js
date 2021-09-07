//imports paquetes
// const express = require('express');
import express from 'express';


// const dotenv = require('dotenv');
import dotenv from 'dotenv';
dotenv.config();

//importando archivos
// const db = require('./utils/db');
import connect from './utils/db';
connect();


const PORT = process.env.PORT || 3000;

const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/',router);


router.get('/',(req,res) => {

    res.status(200).json("backend funcionando!!!!");
});


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