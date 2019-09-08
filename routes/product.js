
const express = require("express");
const productRouter =  express.Router();

const userController = require("../controllers/user");
const authController = require("../controllers/auth"); 
const productController = require("../controllers/product");

productRouter.param("userId", userController.findUserById);
productRouter.param("productId", productController.findProductById);

// create a new product 
productRouter.post("/product/:userId", authController.requireSignIn, authController.isAuth, 
    authController.isAdmin, productController.createProduct)
// find a product
productRouter.get("/product/:productId", productController.findProduct);
// find photo
productRouter.get("/product/photo/:productId", productController.loadPhoto);

//delete a product
productRouter.delete("/product/:productId/:userId",authController.requireSignIn, authController.isAuth, 
    authController.isAdmin, productController.deleteProduct);
// update a product
productRouter.put("/product/:productId/:userId", authController.requireSignIn,
    authController.isAuth, authController.isAdmin, productController.updateProduct);

productRouter.get("/products", productController.listAllProducts);

productRouter.get("/products/categories", productController.listCategories);

productRouter.post("/products/search", productController.listBySearch);


module.exports = productRouter;