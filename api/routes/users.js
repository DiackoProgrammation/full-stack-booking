import express from "express";
import User from "../models/User.js";
import { createUser, updateUser, deleteUser, getUser, getallUsers} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";


express().use(express.json());

const router  = express.Router();

router.get("/checkauthentification", verifyToken,(req,res,next)=>{
    res.send("hello user u are logged in")
}) 

router.get("/checkuser/:id", verifyUser,(req,res,next)=>{
    res.send("hello user, you are logged in and you can delete your account ")
}) 

router.get("/checkadmin/:id", verifyAdmin,(req,res,next)=>{
    res.send("hello admin, you are logged in and you can delete all account ")
}) 

// CREATE
router.post("/", verifyAdmin ,createUser)
// UPDATE
router.put("/:id", verifyUser ,updateUser);
// DELETE
router.delete("/:id", verifyAdmin ,deleteUser);
// GET
router.get("/:id", verifyUser ,getUser);
// GET ALL
router.get("/",verifyAdmin,getallUsers);

export default router;

