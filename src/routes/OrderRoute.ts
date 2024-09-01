import  Express  from "express";
import {jwtCheck,jwtParse} from "../middleware/Auth"
import OrderController from "../controllers/OrderController";
import Order from "../models/Order";
const router=Express.Router();

router.post("/checkout/create-checkout-session",jwtCheck,jwtParse,OrderController.createCheckoutSession)
router.post("/checkout/webhook",OrderController.stripeWebhookHandler)


export default router