const jwt = require("jsonwebtoken");
const authConfig = require("../config/authConfig");
const User = require("../model/customerModel");

verifyToken = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(400).send({ message: "No Token Provided" });
    }
    const decoded = jwt.verify(token, authConfig.secretkey);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "LOGIN REQUIRED" });
  }
};

isCustomer = (req, res, next) => {
  User.findById({ _id: req.userId })
    .exec()
    .then((user) => {
      if (user.role == "CUSTOMER") {
        next();
        return;
      }
      res.status(401).json({ message: "Not Authorized" });
    })
    .catch((err) => {
      console.log("Authorized  method Error" + err);
      res.status(500).json({
        error: err,
      });
    });
};

const customerAuth = {
  verifyToken,
  isCustomer,
};

module.exports = customerAuth;
