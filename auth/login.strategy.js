import User from '../models/User.models';

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');


const logiStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
},
async (req, email, password, done) => {
    try {
        const existUser = await User.findOne({ email });
        
    } catch (error) {
        return done(error);
    }
})