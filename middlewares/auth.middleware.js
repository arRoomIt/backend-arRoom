const isUser = (req, res, next) => {
    if(req.isAuthenticated()){
        console.log("isUser-->", req.user.role);
        return next()
    }
    return res.status(401).json("Registrate/logueate");
};

const isHost = (req, res, next) => {
    if(req.isAuthenticated()){
        console.log("isHost-->", req.user.role);
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
    if(req.isAuthenticated()){
        console.log("isAdmin-->", req.user.role);
        if(req.user.role==="admin"){
            return next();
        }
        return res.status(401).json("No estas autorizado");
    }
    return res.status(401).json("Registrate/logueate");
}

export{isUser,isHost,isAdmin};