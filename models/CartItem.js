const mongoose = require('mongoose')

const CartItemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
    cart: [
        {
            id: { type: mongoose.Schema.Types.ObjectId },
            product: { type: mongoose.Schema.ObjectId, ref: "Product" },
            quantity: { type: Number, default: 1 },
            price: Number,
            total: Number
        }
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
})

module.exports = mongoose.model("CartItem", CartItemSchema)