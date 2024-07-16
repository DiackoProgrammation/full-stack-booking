import jwt from "jsonwebtoken"; // Import du module jsonwebtoken
import { createError } from "./error.js"; // Import de la fonction createError à partir du fichier error.js

export const verifyToken = (req, res, next) => {
    const token = req.cookies.acces_token;
    if (!token) {
        return next(createError(401, "You are not authenticated"));
    }

    jwt.verify(token, process.env.JWT, (err, user) => { // Utilisation de jwt.verify pour vérifier le token
        if (err)  return next(createError(403, "Token is not valid!"));
        req.user = user;
        next();
    });
};

export const verifyUser = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            return next(createError(403, "You are not authorized"))
        }
    })
}

export const verifyAdmin = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.isAdmin){
            next()
        }else{
            return next(createError(403, "You are not authorized"))
        }
})
}
