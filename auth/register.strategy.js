const LocalStrategy = require('passport-local').Strategy;

import bcrypt from 'bcrypt';

import {validateEmail,validatePass} from "../utils/utilsAuth";

import User from "../models/User.model";

const registerStrategy = new LocalStrategy(
    {
        usernameField:"email",
        passwordField:"password",
        passReqToCallback: true

    },

    async(req,email,password,done) => {

        try {
            
            const existingUser = await User.findOne({ email });

            if(existingUser){
                
                const error = new Error ("Usuario ya registrado");
                return done(error);
            }

            const isValidEmail= validateEmail(email);
            if(!isValidEmail){
                const error = new Error ("Email incorrecto. No cumple el formato");
                return done(error);

            }
            const isValidPassword = validatePass(password);
            if(!isValidPassword){
                const error = new Error ("Contraseña incorrecta. Tiene que contener minimo 8 caracteres,una minuscula,una mayuscula y un numero");
                return done(error);
            }

            const saltRounds = 10;
            const hash = await bcrypt.hash(password,saltRounds);

            const newUser = new User({
                email,
                password: hash,
                name:req.body.name,
                phoneNumber:req.body.phoneNumber,
                isHost:req.body.isHost,
                profileImage:req.body.profileImage,
            });
            if(newUser.isHost === true){
                newUser.role = 'host';
            }


            const savedUser = await newUser.save();
            savedUser.password = undefined;

            return done(null,savedUser);

        } catch (error) {
            return done(error);
        }

    });

export default registerStrategy;