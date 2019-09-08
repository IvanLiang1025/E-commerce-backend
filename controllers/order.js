

const {Order} = require("../models/order");
const errorHandler = require("../helpers/dbErrorHandler");

function createOrder(req, res) {
    const order = req.body.order;
    order.user = req.userProfile;
    const newOrder = new Order(order);

    newOrder.save((err, result) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(result);
    })

}


module.exports ={
    createOrder
}