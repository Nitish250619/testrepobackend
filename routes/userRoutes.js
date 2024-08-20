import express from "express";
import { getAllUsers, registerController, loginController } from "../controllers/userController.js"
import validateUserRegistration from "../middleware/usermiddleware.js";
import validateLogin from "../middleware/userlogin.middleware.js";

const router = express.Router();


// GET ALL USER || GET
router.get("/all-users", getAllUsers);


//CREATE USER || POST

router.post("/register" ,validateUserRegistration, registerController)


//LOGIN USER || POST

router.post("/login" ,validateLogin, loginController)




export default router;
