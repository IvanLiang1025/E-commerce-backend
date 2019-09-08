

const express = require("express");
const paymentRouter = express.Router();
const userController = require("../controllers/user");
const authController = require("../controllers/auth");
const paymentController = require("../controllers/payment");


paymentRouter.param("userId", userController.findUserById);

paymentRouter.get("/payment/:userId", authController.requireSignIn, authController.isAuth, paymentController.getToken);

paymentRouter.post("/payment/:userId", authController.requireSignIn, authController.isAuth, paymentController.processPayment);


module.exports = paymentRouter;