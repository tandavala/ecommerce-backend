const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    _id: mongooge.Schema.Types.ObjectId,
    firstname: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true,
    },
    contact: { type: String },
    profilePic: { type: String },
    createdAt: Date,
    updatedAt: Date
})

module.exports = User = mongoose.model("User", UserSchema)