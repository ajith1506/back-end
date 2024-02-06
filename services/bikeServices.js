// bikeService.js
const express = require("express");
const router = express.Router();
const BikeController = require("../controllers/bikeController");
const adminAuth = require("../middlewares/admin-auth");

router.post(
  "/addBike",
  [adminAuth.verifyToken, adminAuth.isAdmin],
  BikeController.addBike
);

router.get("/findAll", BikeController.findAllBikes);
router.get("/findAllBrands", BikeController.findAllBrands);
router.post("/findByBrand", BikeController.findByBrand);
router.get("/findByBike/:bikeId", BikeController.findByBikeId);
router.patch(
  "/updateBike/:id",
  [adminAuth.verifyToken, adminAuth.isAdmin],
  BikeController.updateBike
);
router.delete(
  "/deleteBike/:bikeId",
  [adminAuth.verifyToken, adminAuth.isAdmin],
  BikeController.deleteBike
);

module.exports = router;
