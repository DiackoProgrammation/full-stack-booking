import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js"


// CREATE
export const createHotel = async (req,res,next)=>{
    const newHotel = new Hotel(req.body)

    try{
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    }catch(err){
        res.status(500).send(err)
    }
}
// UPDATE
export const updateHotel = async (req,res,next)=>{
    try {
        const updtaedHotel = await Hotel.findByIdAndUpdate(req.params.id,{ $set: req.body})
        res.status(200).json(updtaedHotel);
    } catch (err) {
        next(err)
    }
}
// DELETE
export const deleteHotel = async (req,res,next)=>{
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("L'hotel à été supprimé avec succès");
    } catch (err) {
        next(err)
    }
}
// GET 
export const getHotel = async (req,res,next)=>{
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel);
    } catch (err) {
        next(err)
    }
}
// GET ALL
export const getallHotel = async (req,res,next)=>{
    const { min, max, limit, ...others  } = req.query;
const parsedLimit = parseInt(limit);
try {
    const hotels = await Hotel.find({ ...others,cheapestPrice:{$gt:min | 1, $lt:max || 999},
     }).limit(parsedLimit);
        res.status(200).json(hotels);
    } catch (err) {
        next(err)
    }
}

// ALL HOTELS BY CITY
export const countByCity = async (req,res,next)=>{
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list);
    } catch (err) {
        next(err)
    }
}
// ALL HOTELS BY Type
export const countByType = async (req,res,next)=>{
    try {
    const hotelCount = await Hotel.countDocuments({type:"hotel"})
    const apartmentCount = await Hotel.countDocuments({type:"apartment"})
    const resortCount =await  Hotel.countDocuments({type:"resort"})
    const villaCount = await Hotel.countDocuments({type:"villa"})
    const cabinCount = await Hotel.countDocuments({type:"cabin"})
        
    res.status(200).json([
        {type:"hotel",count:hotelCount},
        {type:"apartments",count:apartmentCount},
        {type:"resorts",count:resortCount},
        {type:"villas",count:villaCount},
        {type:"cabins",count:cabinCount},
    ]);
    

    } catch (err) {
        next(err)
    }
}

// GET HOTEL ROOMS
export const getHotelRooms = async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
  
      // Vérifiez si l'hôtel existe
      if (!hotel) {
        return res.status(404).json({ success: false, message: "Hotel not found" });
      }
  
      // Vérifiez si les rooms existent
      if (!hotel.rooms) {
        return res.status(400).json({ success: false, message: "Rooms not found in hotel" });
      }
  
      const list = await Promise.all(
        hotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
  
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  };