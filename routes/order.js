

const express = require("express");
const orderRouter = express.Router();
const userController = require("../controllers/user");
const authController = require("../controllers/auth");
const orderController = require("../controllers/order");


orderRouter.param("userId", userController.findUserById);

orderRouter.post("/order/:userId", 
    authController.requireSignIn, 
    authController.isAuth, 
    userController.addOrderToUserHistory,
    orderController.createOrder);


module.exports = orderRouter;