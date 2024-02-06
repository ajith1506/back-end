const express = require("express");
const router = express.Router();
const ServiceController = require("../controllers/serviceController");
const adminAuth = require("../middlewares/admin-auth");

router.post(
  "/addService",
  [adminAuth.verifyToken, adminAuth.isAdmin],
  ServiceController.addService
);

router.get("/findAll", ServiceController.findAll);

router.get("/findById/:serviceId", ServiceController.findByServiceId);
router.patch(
  "/updateService/:serviceId",
  [adminAuth.verifyToken, adminAuth.isAdmin],
  ServiceController.updateService
);

router.delete(
  "/deleteService/:serviceId",
  [adminAuth.verifyToken, adminAuth.isAdmin],
  ServiceController.deleteService
);
module.exports = router;
