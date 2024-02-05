const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const AccountController = require("../controllers/accountController");

router.get("/findAll", checkAuth.verifyToken, AccountController.getAllCustomer);

router.patch("/updateProfile/:custId", AccountController.findCustById);

router.get(
  "/findCustById",
  [checkAuth.verifyToken, checkAuth.isCustomer],
  AccountController.updateprofile
);

router.delete(
  "/deleteAccount/:custId",
  [checkAuth.verifyToken, checkAuth.isCustomer],
  AccountController.deleteCustomer
);

router.patch(
  "/update/:mechId",
  [checkAuth.verifyToken],
  AccountController.updateProfile
);

router.delete(
  "/delete/:mechId",
  [checkAuth.verifyToken],
  AccountController.deleteProfile
);

module.exports = router;
