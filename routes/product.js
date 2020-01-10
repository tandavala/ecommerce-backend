const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const authenticate = require("../middleware/auth");

const Product = require("../models/Product");

router.post(
  "/create",
  [
    check("name", "Nome e obrigatorio")
      .not()
      .isEmpty(),
    chec("slug", "Slug e obrigatorio")
      .not()
      .isEmpty(),
    chec("price", "Preco e obrigatorio")
      .not()
      .isEmpty(),
    check("stock", "Estoque e obrigatorio")
      .not()
      .isEmpty(),
    check("description", "Descricao e obrigatorio")
      .not()
      .isEmpty(),
    check("category", "Categoria e obrigatorio")
      .not()
      .isEmpty(),
    check("createdBy", "Criado por e obrigatrio")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    const {
      name,
      slug,
      price,
      stock,
      description,
      category,
      createdBy
    } = req.body;

    try {
      const product = new Product({
        name: name,
        slug: slug,
        price: price,
        stock: stock,
        description: description,
        category: category,
        createdBy: createdBy
      });
      await product.save();
      return res.status(200).json({
        product: product
      });
    } catch (err) {
      return res.status(500).json({
        error: err.message
      });
    }
  }
);

module.exports = router;
