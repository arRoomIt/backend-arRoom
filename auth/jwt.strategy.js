import passport from "passport";
import dotenv from 'dotenv';
const JWTstrategy = require("passport-jwt").Strategy;
const extractJWT = require("passport-jwt").ExtractJwt;
dotenv.config()


passport.use(new JWTstrategy({ 

    secretOrKey = process.env.SECRET_OR_KEY,
    jwtFromRequest = extractJWT.fromUrlQueryParameter("secret_token")},
    (token,done) => {
        try {
            console.log("token", token);
            return done(null, token);

        } catch (error) {
            console.log(error);
            return done(error);
        }
    }
))

