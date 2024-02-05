// orderRoutes.js

const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const OrderController = require("../controllers/orderController");

router.get(
  "/findPlacedOrder",
  [checkAuth.verifyToken, checkAuth.isAdmin],
  OrderController.findPlacedOrders
);

router.patch(
  "/updateOrder/:orderId",
  [checkAuth.verifyToken, checkAuth.isAdmin],
  OrderController.updateOrder
);

router.patch(
  "/updateOrder/:orderId",
  [checkAuth.verifyToken, checkAuth.isMechanic],
  OrderController.updateOrder
);

router.get(
  "/findInProcessOrders/:mechId",
  [checkAuth.verifyToken, checkAuth.isMechanic],
  OrderController.findInProcessOrders
);

router.get(
  "/findMyOrders/:mechId",
  [checkAuth.verifyToken, checkAuth.isMechanic],
  OrderController.findMyOrders
);

router.post("/addOrder", [checkAuth.verifyToken], OrderController.addOrder);

router.get("/findCompletedOrders", OrderController.findCompltedOrders);

module.exports = router;
