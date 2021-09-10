import express from 'express';
import passport from 'passport';
import morgan from 'morgan';
// import express-session as session from 'express-session';
// import connect-mongo as MongoStore from 'connect-mongo';
const session = require('express-session');
const MongoStore = require('connect-mongo');

import dotenv from 'dotenv';
dotenv.config();

import setStrategies from './auth';

setStrategies();
 
//routes
import {router as routerWorkspace} from './routes/Workspace.routes';
import {router as routerAuth} from './routes/Auth.routes';
import routerReservation from './routes/reservation.routes';
import routerReview from './routes/Review.routes'; 
import routerUser from './routes/User.routes';

import connect,{DB_URL} from './config/db';

connect();


const PORT = process.env.PORT || 3000;

const app = express();

app.use(session({
    secret:process.env.SESSION_SECRET || "!@#$%^GVHCJGhbhdc23456",
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:24 * 60 * 60 * 1000
    },
    store: MongoStore.create({mongoUrl:DB_URL})
}));

app.use(passport.initialize());

app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//se usa morgan para saber las rutas
app.use(morgan('tiny'));

app.use('/workspace',routerWorkspace);
app.use('/reservation', routerReservation);
app.use("/review", routerReview);
app.use('/auth',routerAuth);
app.use('/user',routerUser);

//para controlar paginas que no existe
app.use('*',(req,res,next) => {
    const error = new Error('Página no encontrada');
    return res.status(404).json(error.message);
})

app.use((error,req,res,next) => {
    console.log("tratamiento de error global-->",error.message);
    return res.status(error.status || 500).json(error.message || 'Unexpected error');
})


app.listen(PORT,() => {
    console.log(`Server runnig in http://localhost:${PORT}`);
});