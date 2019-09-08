

const express = require("express");
const categoryRouter = express.Router();
const categoryController = require("../controllers/category");
const userController = require("../controllers/user");
const authController = require("../controllers/auth");

categoryRouter.param("userId", userController.findUserById);
categoryRouter.param("categoryId", categoryController.findCategoryById);

categoryRouter.post("/category/:userId",authController.requireSignIn, 
    authController.isAuth, authController.isAdmin, categoryController.createCategory);

categoryRouter.get("/category/:categoryId", categoryController.findCategory);

categoryRouter.put("/category/:categoryId/:userId", authController.requireSignIn, 
    authController.isAuth, authController.isAdmin, categoryController.updateCategory);

categoryRouter.delete("/category/:categoryId/:userId", authController.requireSignIn, 
    authController.isAuth, authController.isAdmin, categoryController.deleteCategory);

categoryRouter.get("/category", categoryController.getAllCategory);


module.exports = categoryRouter;