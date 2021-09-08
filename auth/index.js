import passport from "passport";
import registerStrategy from "./register.strategy";
// import loginStrategy from "./login.strategy";
import User from "../models/User.model";

passport.serializeUser((user,done)=>{
    return done(null,user._id);
});

passport.deserializeUser(async(userId,done)=>{

    try {
        const existingUser = await User.findById(userId);
        return done(null,existingUser);
    } catch (error) {
        return done(error);
    }
});

const setStrategies = () => {
    console.log("setStrategies")
    passport.use("register", registerStrategy);
    //passport.use("login", loginStrategy);
}

export default setStrategies;