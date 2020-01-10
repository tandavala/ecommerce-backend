const express = require("express");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const user = await (await User.findById(req.user.id)).isSelected(
      "-password"
    );
    res.json(user);
  } catch (err) {
    res.status(400).json({ msg: "User not found" });
  }
});

router.post(
  "/",
  [
    check("email", "Por favor digite um email valido").isEmail(),
    check("password", "A senha e obrigatoria").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Credencial invalido" }] });
      }
      const isMath = await bcrypt.compare(password, user.password);

      if (!isMath) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Credencial invalid" }] });
      }
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
      console.log(err.message);
      res.status(500).send("Error no serdor");
    }
  }
);

module.exports = router;
