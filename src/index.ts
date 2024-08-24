import express,{Request,Response} from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import MyUserRoute from "./routes/MyUserRoute"
import {v2 as cloudinary }  from "cloudinary";
import MyRestaurantRoutes from "./routes/MyRestaurantRoutes"
import RestaurantRoute from "./routes/RestaurantRoute"



mongoose.connect(process.env.mongodburl as string).then(() => console.log("connected to database"));





cloudinary.config({
cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
api_key:process.env.CLOUDINARY_API_KEY,
api_secret:process.env.CLOUDINARY_API_SECRET,

})

const app=express();

app.use(express.json());
app.use(cors());



  app.get("/health",async (req:Request,res:Response) =>{
    res.send({message:"health ok!"});
})

app.use("/api/my/user",MyUserRoute);
app.use("/restaurant",MyRestaurantRoutes);
app.use("/api/getrestaurants",RestaurantRoute)

app.listen(4000,()=>{
    console.log("listening");
})