const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");
const customerAuth = require("../middlewares/customer-auth");

router.post("/logincustomer", AuthController.customerlogin);

router.post("/newcustomer", AuthController.customerregister);
router.get("/allAccess", (req, res) => {
  res.status(200).send("Public Content.");
});

router.get(
  "/customerAccess",
  [customerAuth.verifyToken, customerAuth.isCustomer],
  (req, res) => {
    res.status(200).send("Customer Content.");
  }
);

router.post("/register", AuthController.register);

router.post("/login", AuthController.login);

module.exports = router;
