// orderRoutes.js

const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");
const mechanicAuth = require("../middlewares/mechanic-auth");
const orderAuth = require("../middlewares/order-auth");
const customerAuth = require("../middlewares/customer-auth");
const adminAuth = require("../middlewares/admin-auth");

router.get(
  "/findPlacedOrder",
  [adminAuth.verifyToken, adminAuth.isAdmin],
  OrderController.findPlacedOrders
);

router.patch(
  "/updateOrder/:orderId",
  [adminAuth.verifyToken, adminAuth.isAdmin],
  OrderController.updateOrder
);

router.patch(
  "/updateOrder/:orderId",
  [mechanicAuth.verifyToken, mechanicAuth.isMechanic],
  OrderController.updateOrder
);

router.get(
  "/findInProcessOrders/:mechId",
  [mechanicAuth.verifyToken, mechanicAuth.isMechanic],
  OrderController.findInProcessOrders
);

router.get(
  "/findMyOrders/:mechId",
  [mechanicAuth.verifyToken, mechanicAuth.isMechanic],
  OrderController.findMyOrders
);

router.post("/addOrder", [orderAuth.verifyToken], OrderController.addOrder);

router.get("/findCompletedOrders", OrderController.findCompltedOrders);

router.get(
  "/findOrders/:customerId",
  [customerAuth.verifyToken, customerAuth.isCustomer],
  OrderController.findMyOrders
);

module.exports = router;
