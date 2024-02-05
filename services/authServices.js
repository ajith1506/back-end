const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");
const checkAuth = require("../middlewares/check-auth");

router.post("/login", AuthController.logins);

router.post("/register", AuthController.registers);
router.get("/allAccess", (req, res) => {
  res.status(200).send("Public Content.");
});

router.get(
  "/customerAccess",
  [checkAuth.verifyToken, checkAuth.isCustomer],
  (req, res) => {
    res.status(200).send("Customer Content.");
  }
);

router.post("/register", AuthController.register);

router.post("/login", AuthController.login);

module.exports = router;
