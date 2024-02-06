const jwt = require("jsonwebtoken");
const authConfig = require("../config/authConfig");
const Member = require("../model/memberModel");

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

isMechanic = (req, res, next) => {
  Member.findByid({ _id: req.userId })
    .exec()
    .then((user) => {
      if (user.role == "MECHANIC") {
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

const mechanicAuth = {
  verifyToken,
  isMechanic,
};

module.exports = mechanicAuth;
