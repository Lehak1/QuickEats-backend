import Restaurant from "../models/Restaurant";
import {Request,Response} from "express"
import cloudinary from "cloudinary"
import mongoose from "mongoose";
const createMyRestaurant=async (req: Request, res: Response)=>{
try{
    const existingrestaurant=await Restaurant.findOne({user:req.userId})
    if(existingrestaurant)
        return res.status(409).json({message:"User restaurant already exists"})
   
    const imageUrl = await uploadImage(req.file as Express.Multer.File);

// const image=req.file as Express.Multer.File;
// const base64Image=Buffer.from(image.buffer).toString("base64")
// const dataURI=`data:${image.mimetype};base64,${base64Image}`
// const uploadResponse=await cloudinary.v2.uploader.upload(dataURI);

const newRestaurant=new Restaurant(req.body)
newRestaurant.lastUpdated=new Date();
newRestaurant.imageUrl=imageUrl;
newRestaurant.user=new mongoose.Types.ObjectId(req.userId)

await newRestaurant.save();
res.status(201).send(newRestaurant)

}
catch(error){
    console.log(error);
    res.status(500).json({ message: "Something went wrong",error });

}





}


const getMyRestaurant=async(req:Request,res:Response)=>{
    try{
const restaurant=await Restaurant.findOne({user:req.userId})

if(!restaurant){
  return res.status(404).json({message:"No such restaurant exists"})
}
res.status(200).json(restaurant)

}
catch(error){
    console.log("error",error)
res.status(500).json({message:"Error fetching restaurant"})
}
}

const updateMyRestaurant=async (req:Request,res:Response)=>{
try{
    
const restaurant=await Restaurant.findOne({user:req.userId})
if(!restaurant){
    return res.status(404).json({message:"no restaurant found"})
}
restaurant.restaurantName = req.body.restaurantName;
    restaurant.city = req.body.city;
    restaurant.country = req.body.country;
    restaurant.deliveryPrice = req.body.deliveryPrice;
    restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    restaurant.cuisines = req.body.cuisines;
    restaurant.menuItems = req.body.menuItems;
    restaurant.lastUpdated = new Date();

    if (req.file) {
        const imageUrl = await uploadImage(req.file as Express.Multer.File);
        restaurant.imageUrl = imageUrl;
      }

await restaurant.save();
res.status(200).send(restaurant);
}
catch(error){
console.log(error);
res.status(500).json({message:"something went wrong"})
}
}

const uploadImage = async (file: Express.Multer.File) => {
    const image = file;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
  
    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
    return uploadResponse.url;
  };


export default{
    createMyRestaurant,
    getMyRestaurant,
    updateMyRestaurant                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
}