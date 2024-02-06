const express = require("express");
const router = express.Router();
const AccountController = require("../controllers/accountController");
const customerAuth = require("../middlewares/customer-auth");
const mechanicAuth = require("../middlewares/mechanic-auth");

router.get(
  "/findAll",
  customerAuth.verifyToken,
  AccountController.getAllCustomer
);

router.patch("/updateProfile/:custId", AccountController.findCustById);

router.get(
  "/findCustById",
  [customerAuth.verifyToken, customerAuth.isCustomer],
  AccountController.updateprofile
);

router.delete(
  "/deleteAccount/:custId",
  [customerAuth.verifyToken, customerAuth.isCustomer],
  AccountController.deleteCustomer
);

router.patch(
  "/update/:mechId",
  [mechanicAuth.verifyToken],
  AccountController.updateProfile
);

router.delete(
  "/delete/:mechId",
  [mechanicAuth.verifyToken],
  AccountController.deleteProfile
);

module.exports = router;
