const jwt = require("jsonwebtoken");
const config = require("config");

const authenticate = (req, res, next) => {
  try {
    // Extran Authatication Token
    const token = req.headers["auth-token"];
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    next();
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

module.exports = authenticate;
