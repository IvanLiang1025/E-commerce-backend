

const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const CartItemSchema = new mongoose.Schema(
    {
        product: {
            type: ObjectId, 
            ref: "Product"
        },
        name: String,
        count: Number,
        price: Number
    },
    {timestamps: true}
)

const CartItem = mongoose.model("CartItem", CartItemSchema)

const OrderSchema = new mongoose.Schema(
    {
        products: [CartItemSchema],
        transactionId: {},
        amount: Number,
        address: String,
        status: {
            type: String,
            default: "Not processed",
            enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"]
        },
        updated: Date,
        user: {
            type: ObjectId,
            ref: "User"
        }

    }
)

const Order = mongoose.model("Order", OrderSchema);

module.exports = {
    Order,
    CartItem
}