import Hotel from "../models/Hotel.js"
import User from "../models/User.js"
import bcrypt from "bcrypt"
// CREATE
export const createUser = async (req,res,next)=>{
    const newUser = new User(req.body)

    try{
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    }catch(err){
        res.status(500).send(err)
    }
}
// UPDATE
export const updateUser = async (req, res, next) => {
    try {
        const { password, ...updates } = req.body; // Exclure le mot de passe des mises à jour
        if (password) {
            const salt = bcrypt.genSaltSync(10);
            updates.password = bcrypt.hashSync(password, salt); // Hasher le nouveau mot de passe
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true });

        if (!updatedUser) {
            return next(createError(404, "User not found"));
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
};
// DELETE
export const deleteUser = async (req,res,next)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("L'User à été supprimé avec succès");
    } catch (err) {
        next(err)
    }
}
// GET 
export const getUser = async (req,res,next)=>{
    try {
        const User = await User.findById(req.params.id)
        res.status(200).json(User);
    } catch (err) {
        next(err)
    }
}
// GET ALL
export const getallUsers = async (req,res,next)=>{
    
    try {
        const users = await User.find()
        res.status(200).json(users);
    } catch (err) {
        next(err)
    }
}

