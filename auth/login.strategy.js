import User from '../models/User.model';

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');


const loginStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
},
async (req, email, password, done) => {
    try {

        const existUser = await User.findOne({ email });

        if(!existUser){
            const error = new Error("El usuario no existe, proceda a registrarse");
            error.status = 404;
            return done(error);
        }

        const isValidPassword = await bcrypt.compare(password, existUser.password);

        if(!isValidPassword){
            const error = new Error(`Invalid password: ${existUser.password}`);
            return done(error);
        };

        existUser.password = undefined;
        return done(null, existUser);

        
    } catch (error) {
        return done(error);
    }
});

export default loginStrategy;