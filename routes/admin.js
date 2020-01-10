const exporess = require("express");
const { check, validationResult } = require("express-validator");
const router = exporess.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");

router.post("/signup", [
  check("firstName", "Nome e obrigatorio")
    .not()
    .isEmpty(),
  check("lastName", "Sobrenome e obrigatorio")
    .not()
    .isEmpty(),
  check("email", "Email deve valido").isEmail(),
  check("password", "A senha e obrigatoria").isLength({ min: 6 })
]);
