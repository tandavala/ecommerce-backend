const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();

const Category = require("../models/Category");

categoryTree = (parentId = "", docs) => {
  const category = docs.filter(doc => parentId == doc.parent);

  var categories = [];
  for (var cat of category) {
    categories.push({
      _id: cat._id,
      name: cat.name,
      slug: cat.slug,
      children: categoryTree(cat._id, docs)
    });
  }
  return categories;
};

router.get("/", (req, res, next) => {
  Category.find({})
    .exec()
    .then(docs => {
      const categories = categoryTree("", docs);
      res.status(201).json({
        msg: categories
      });
    })
    .catch(er => {
      res.status(500).json({
        error: er
      });
    });
});

router.post(
  "/",
  [
    check("name", "Nome e obrigatorio")
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
    const { name, slug, parent, createdBy } = req.body;
    try {
      category = new Category({
        name: name,
        slug: slug,
        parent: parent,
        createdAt: new Date(),
        createdBy: createdBy
      });
      await category.save();

      return res.status(200).json({
        category: category
      });
    } catch (err) {
      return res.status(500).json({
        error: err.message
      });
    }
  }
);

module.exports = router;
