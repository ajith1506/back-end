const express = require("express");
const router = express.Router();
const MechanicController = require("../controllers/mechanicController");
const adminAuth = require("../middlewares/admin-auth");

router.get(
  "/findAvailable",
  [adminAuth.verifyToken, adminAuth.isAdmin],
  MechanicController.findAvailable
);

router.get(
  "/findAll",
  [adminAuth.verifyToken, adminAuth.isAdmin],
  MechanicController.findAll
);

module.exports = router;
