const LocalStrategy = require('passport-local').Strategy;

import bcrypt from 'bcrypt';

import User from "../models/User.model";

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validatePass = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return re.test(String(password));
}

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
                
            }

        } catch (error) {
            
        }

    }

)