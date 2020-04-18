const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "should-be-long-string");
    next();
  } catch {
    res.status(401).json({
      message: "token failed",
    });
  }
};
