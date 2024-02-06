const jwt = require("jsonwebtoken");
const authConfig = require("../config/authConfig");

verifyToken = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
    const decoded = jwt.verify(token, authConfig.secretkey);

    req.userId = decoded.userId;
    console.log(decoded.userId);
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Authentication Failed",
    });
  }
};

const orderAuth = {
  verifyToken,
};

module.exports = orderAuth;
