const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const gravater = require("gravatar");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");

const User = require("../models/User");
const UserAddress = require("../models/UserAddress");

// @route     POST api/users
// @desc      Creating user
// @access    Public
router.post(
  "/signup",
  [
    check("firstName", "Nome é obrigatorio")
      .not()
      .isEmpty(),
    check("lastName", "Nome é obrigatorio")
      .not()
      .isEmpty(),
    check("email", "Por favor digite um email valido").isEmail(),
    check("password", "A senha deve no minimo ter 6 caracteres").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    const { firstName, lastName, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      console.log("Enquanto processa...");
      if (user) {
        return res.status(400).json({
          errors: [{ msg: "Este email ja esta sendo usado" }]
        });
      }
      console.log("Ja processou...");

      const avatar = gravater.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      user = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        profilePic: avatar
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);

      console.error("Aqui...");
      return res.status(500).json({
        data: err.message
      });
    }
  }
);

module.exports = router;
