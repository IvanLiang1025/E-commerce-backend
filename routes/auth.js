

const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth"); 
const userValidator = require("../validator/uservalidator");


// user authorization
authRouter.post("/signup", userValidator, authController.signUp);
authRouter.post("/signin", authController.signIn);
authRouter.post("/signout", authController.signOut);


module.exports = authRouter;
