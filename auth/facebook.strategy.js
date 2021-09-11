import facebook from 'passport-facebook';
import dotenv from 'dotenv';
dotenv.config();

const facebookStrategy = new facebook.Strategy({

    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.CALLBACK_FACEBOOK,
    

}, (accessToken, refreshToken,profile,done) => {
    console.log(profile);
   return done(null, profile);
    
});

export default facebookStrategy;