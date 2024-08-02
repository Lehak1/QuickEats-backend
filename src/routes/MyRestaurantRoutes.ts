import express from "express";
import multer from "multer";
import MyRestaurantController from "../controllers/MyRestaurantController"
import { jwtCheck,jwtParse } from "../middleware/Auth";
import { validateMyRestaurantRequest } from "../middleware/validation";

const router1=express.Router();

console.log("MyRestaurantRoutes loaded");
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});
router1.get("/",jwtCheck,jwtParse,MyRestaurantController.getMyRestaurant)
router1.post("/",upload.single("imageFile"),validateMyRestaurantRequest,jwtCheck,jwtParse,MyRestaurantController.createMyRestaurant)
router1.put("/",upload.single("imageFile"),validateMyRestaurantRequest,jwtCheck,jwtParse,MyRestaurantController.updateMyRestaurant)
console.log("MyRestaurantRoutes loaded");
export default router1;