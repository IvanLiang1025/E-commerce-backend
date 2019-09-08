
const User = require("../models/user");

function findUserById(req, res, next, id){
    User.findOne({_id: id})
        .exec((err, user) => {
            if(err || !user){
                return res.status(400).json({
                    error: "user not found"
                })
            }
            req.userProfile = user;
            next();
        })
}

function findUserProfile(req, res){
    req.userProfile.salt = undefined;
    req.userProfile.hashed_password = undefined;
    return res.json(req.userProfile);
}

function updateProfile(req, res){
    User.findOneAndUpdate({_id: req.userProfile._id}, 
        req.body, 
        {new: true},
        (err, user) => {
            if(err){
                return res.status(400).json({
                    error: "failed to update user profile "
                })
            }
            user.hashed_password = undefined;
            user.salt = undefined;
            return res.json(user);
        })
}


function addOrderToUserHistory (req, res, next){
    let history = [];
    let order = req.body.order;
    for(let product  of order.products){
        history.push({
            _id: product._id,
            name: product.name,
            category: product.category,
            price: product.price,
            count: product.count,
            transactionId: order.transactionId,
            amount: order.amount
        })
    }
    console.log("history: ",history);

    User.findOneAndUpdate(
        {_id: req.userProfile._id},
        {$push: {history: history}},
        {new: true}
    )
        .exec()
        .then(result => {
            console.log("User: addOrderToUserHistory, ",result);
            next()
        })
        .catch(err => {
            return res.status(400).json({
                error: "Could not update user purchase history"
            })
        })
}

module.exports = {
    findUserById,
    findUserProfile,
    updateProfile,
    addOrderToUserHistory
}

