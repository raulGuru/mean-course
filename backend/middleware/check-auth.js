const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "should-be-long-string");
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  } catch {
    res.status(401).json({
      message: "token failed",
    });
  }
};