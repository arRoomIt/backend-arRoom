const isUser = (req, res, next) => {
    if(req.isAuthenticated()){
    return next()
    }
    return res.status(401).json("Registrate");
};

const isHost = (req, res, next) => {
    if(req.isAuthenticated()){
        if(req.user.role==="host"){
            return next();
        }
        return res.status(401).json("No estas autorizado");
    }
    return res.status(401).json("Registrate");
}

const isAdmin = (req, res, next) => {
    if(req.isAuthenticated()){
        if(req.user.role==="admin"){
            return next();
        }
        
        return res.status(401).json("No estas autorizado");
    }
    return res.status(401).json("Registrate");
}

export{isUser,isHost,isAdmin};