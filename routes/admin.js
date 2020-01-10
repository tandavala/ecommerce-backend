const exporess = require("express");
const { check, validationResult } = require("express-validator");
const router = exporess.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");

router.post(
  "/signup",
  [
    check("firstName", "Nome e obrigatorio")
      .not()
      .isEmpty(),
    check("lastName", "Sobrenome e obrigatorio")
      .not()
      .isEmpty(),
    check("email", "Email deve valido").isEmail(),
    check("password", "A senha e obrigatoria").isLength({ min: 6 })
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
      let user = await Admin.findOne({ email });
      if (user) {
        return res.satus(400).json({
          errors: [{ msg: "Este email ja esta sendo usado por alguem" }]
        });
      }
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      user = new Admin({
        firstName: firstName,
        lastName: lastName,
        email: email,
        vatar: avatar,
        password: password
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
      return res.status(500).json({
        data: err.messegae
      });
    }
  }
);

module.exports = router;
