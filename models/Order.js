const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  order: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      price: { type: Number, required: true },
      quantity: Number
    }
  ],
  address: { type: mongoose.Schema.Types.ObjectId, ref: "UserAddress" },
  orderData: { type: Date, default: Date.now() },
  paymentType: String,
  paymentStatus: String,
  isOrderCompleted: { type: Boolean, default: false }
});

module.exports = mongoose.model("Order", OrderSchema);
