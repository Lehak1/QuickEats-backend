"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MyUserController_1 = __importDefault(require("../controllers/MyUserController"));
const Auth_1 = require("../middleware/Auth");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
router.get("/", Auth_1.jwtCheck, Auth_1.jwtParse, MyUserController_1.default.getCurrentUser);
router.post("/", Auth_1.jwtCheck, MyUserController_1.default.createCurrentUser); //login
router.put("/", Auth_1.jwtCheck, Auth_1.jwtParse, validation_1.validateMyUserRequest, MyUserController_1.default.updateCurrentUser);
exports.default = router;
