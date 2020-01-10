const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  avatar: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  createdAt: Date
});

module.exports = mongoose.model("Admin", AdminSchema);
