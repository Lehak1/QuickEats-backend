import express from "express";
import { param } from "express-validator";
import RestaurantController from "../controllers/RestaurantController";
const router=express.Router();
router.get("/search/:city",param("city").isString().notEmpty().trim().withMessage("City paramenter must be a valid string"),RestaurantController.searchRestaurant)

export default router;
