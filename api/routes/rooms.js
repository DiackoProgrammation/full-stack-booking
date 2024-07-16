import express from "express";
import { createRoom, updateRoom, deleteRoom, getRoom, getallRoom } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router  = express.Router();

express().use(express.json());

// CREATE
router.post("/:hotelid" ,createRoom)
// UPDATE
router.put("/:id", verifyAdmin ,updateRoom);
// DELETE
router.delete("/:id/:hotelid" ,deleteRoom);
// GET
router.get("/:id" ,getRoom);
// GET ALL
router.get("/" ,getallRoom);

// il faut effacer le cookie à la deconnexion
export default router;

