const isUser = (req, res, next) => {
    console.log("isUser-->", req.user.role);
    if(req.isAuthenticated()){
        return next()
    }
    return res.status(401).json("Registrate/logueate");
};

const isHost = (req, res, next) => {
    console.log("isHost-->", req.user.role);
    if(req.isAuthenticated()){
        if(req.user.role==="host"){
            return next();
        }
        const error = new Error ("No estas autorizado");
        error.status = 401;
        return next(error);
    }
    return res.status(401).json("Registrate/logueate");
}

const isAdmin = (error,req, res, next) => {
    console.log("isAdmin-->", req.user.role);
    if(req.isAuthenticated()){
        if(req.user.role==="admin"){
            return next();
        }
        return res.status(401).json("No estas autorizado");
    }
    return res.status(401).json("Registrate/logueate");
}

export{isUser,isHost,isAdmin};