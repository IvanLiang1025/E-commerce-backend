

const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/user");
const authController = require("../controllers/auth");


userRouter.param("userId", userController.findUserById);
userRouter.get("/secret/:userId", authController.requireSignIn, authController.isAuth, authController.isAdmin,
    (req, res) => {
        res.json({
            user: req.userProfile
    })
})

userRouter.get("/user/:userId", authController.requireSignIn,
    authController.isAuth, userController.findUserProfile);

userRouter.put("/user/:userId", authController.requireSignIn,
authController.isAuth, userController.updateProfile);

module.exports = userRouter;
