const mongoose = require("mongoose");

const UserAddressSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  address: [
    {
      fullName: { type: String, required: true },
      mobileNUmber: { type: Number, required: true },
      pinCode: { type: Number, required: true },
      locality: { type: String, required: true },
      address: { type: String, require: true },
      cityDistrictTown: { type: String, required: true },
      state: { type: String, require: true },
      lanmark: String,
      alternatePhoneNumber: Number
    }
  ]
});
module.exports = mongoose.model("UserAddress", UserAddressSchema);
