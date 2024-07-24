import express,{Request,Response} from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import MyUserRoute from "./routes/MyUserRoute"

mongoose.connect(process.env.mongodburl as string).then(() => console.log("connected to database"));
const app=express();
app.use(express.json());
app.use(cors());
  
app.use("/api/my/user",MyUserRoute);

app.get("/health",async (req:Request,res:Response) =>{
    res.send({message:"health ok!"});
})
app.get("/test",async(req,res) =>{
res.json({msg:"hello"});
});

app.listen(4000,()=>{
    console.log("listening");
})