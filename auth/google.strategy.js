import passport from 'passport';
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
import User from "../models/User.model";
import dotenv from 'dotenv';
dotenv.config();

passport.use(new GoogleStrategy(
    {
    clientID:process.env.GOOGLE_APP_ID ,
    clientSecret: process.env.GOOGLE_APP_SECRET,
    callbackURL: process.env.CALLBACK_GOOGLE,
}, async function (accessToken, refreshToken,profile,done) {
    //console.log(profile);
    // console.log('access token ',accessToken);
    //console.log('refrestoken',refreshToken);
    //console.log(profile._json)
    const {sub,given_name,picture,email} = profile._json;
    try {
        const existingUser = await User.findOne({email});

        if (existingUser){
            const error = new Error ("Usuario ya registrado");
            return done(error)
        }

        const newUser = new User ({
            googleId: sub,
            email : email,
            name : given_name,
            profileImage: picture,
            

        })

        const savedUser = await newUser.save();
        console.log(savedUser);
        
        return done(null, savedUser);
    } catch (error) {
        return done(error);
    }


}
))

passport.use("sign-up-google",new GoogleStrategy(
    {
        clientID:process.env.GOOGLE_APP_ID ,
        clientSecret: process.env.GOOGLE_APP_SECRET,
        callbackURL: process.env.CALLBACK_GOOGLE_LOGIN,
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findById({email});
                                                
      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
      
    }
  )
  );

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });