const express = require("express");
const router = express.Router();

// @route     POST api/users
// @desc      Creating user
// @access    Public
router.post("/signup", (req, res) => {
  console.log(req.body);
  return res.send("User router");
});

module.exports = router;
