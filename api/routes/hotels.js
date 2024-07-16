import express from "express";
import Hotel from "../models/Hotel.js"
import morgan from "morgan";
import bodyParser from "body-parser";
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotelRooms, getallHotel, updateHotel } from "../controllers/hotel.js";
import { createError } from "../utils/error.js";
import { verifyAdmin  } from "../utils/verifyToken.js";

express().use(express.json());

const router  = express.Router();
// CREATE
router.post("/" ,createHotel)
// UPDATE
router.put("/:id", verifyAdmin ,updateHotel);
// DELETE
router.delete("/:id", verifyAdmin ,deleteHotel);
// GET
router.get("/find/:id" ,getHotel);
// GET ALL
router.get("/" ,getallHotel);
router.get("/countByCity" ,countByCity);
router.get("/countByType" ,countByType);
router.get("/room/:id" ,getHotelRooms);

// il faut effacer le cookie à la deconnexion
export default router;