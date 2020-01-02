const express = require("express");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

routeer.get("/", auth, async (req, res) => {
  try {
    const user = await (await User.findById(req.user.id)).isSelected(
      "-password"
    );
    res.json(user);
  } catch (err) {
    res.status(400).json({ msg: "User not found" });
  }
});
