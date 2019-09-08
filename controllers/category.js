
const Category = require("../models/category");
const errorHandler = require("../helpers/dbErrorHandler");



function findCategoryById(req, res, next, id){
    Category.findById(id).exec((err, category) => {
        if(err || !category){
            return res.status(400).json({
                error: "can not find the category"
            })
        }
        req.category = category;
        next();
    })
}

function createCategory(req, res, next){
    console.log(req.body);
    const category = new Category(req.body);
    console.log(category);
    category.save((err, result) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
    
        res.json({
            category: result
        })
    })
}

function findCategory(req, res){
    res.json({
        category: req.category
    })
}

function getAllCategory(req, res){
    Category.find((err, categories) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(categories);
    })
}

function updateCategory(req, res){
    let category = req.category;
    category.name = req.body.name;
    category.save((err, result) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(result);
    })
}

function deleteCategory(req, res){
    Category.deleteOne({_id: req.category._id})
        .exec((err, result) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json({
                message: "Category deleted successfully"
            })
        })
}

module.exports = {
    findCategoryById,
    createCategory,
    findCategory,
    updateCategory,
    deleteCategory,
    getAllCategory
};