const OrderModel = require("../model/orderModel");
const MemberModel = require("../model/memberModel");

//Find Placed Orders
exports.findPlacedOrders = (req, res) => {
  OrderModel.find({ status: "PLACED" })
    .exec()
    .then((response) => {
      if (response.length == 0) {
        res.status(200).json({
          message: "No Orders are available",
        });
      } else {
        res.status(200).json({
          orders: response,
        });
      }
    })
    .catch((err) => {
      console.log("Find All Placed Orders Error: " + err);
      res.status(500).json({
        error: err,
      });
    });
};

//Send Order to Mechanic
exports.updateOrder = (req, res) => {
  const orderId = req.params.orderId;
  //updateOne({ _id: id }, { $set: req.body }
  OrderModel.updateOne(
    { _id: orderId },
    { $set: { status: "IN-PROCESS", mechanicId: req.body.mechanicId } }
  )
    .exec()
    .then((response) => {
      res.status(200).json({
        message: "Order Successfully Assign to Mechanic",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
const Order = require("../model/orderModel");
exports.findMyOrders = (req, res) => {
  Order.find({ customerId: req.params.customerId })
    .exec()
    .then((response) => {
      if (response.length == 0) {
        res.status(200).json({ message: "No Orders" });
      } else {
        res.status(200).json({ orders: response });
      }
    })

    .catch((err) => {
      console.log("Find My Order Error" + err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.findInProcessOrders = (req, res) => {
  OrderModel.find({
    $or: [
      { mechanicId: req.params.mechId, status: "IN-PROCESS" },
      { mechanicId: req.params.mechId, status: "ACCEPTED" },
    ],
  })
    .exec()
    .then((response) => {
      if (response.length == 0) {
        res.status(200).json({
          message: "No Orders are available",
        });
      } else {
        res.status(200).json({
          orders: response,
        });
      }
    })
    .catch((err) => {
      console.log("Find All Placed Orders Error: " + err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.updateOrder = (req, res) => {
  OrderModel.updateOne(
    { _id: req.params.orderId },
    { $set: { status: req.body.status } }
  )
    .exec()
    .then((response) => {
      OrderModel.findOne({ _id: req.params.orderId })
        .exec()
        .then((obj) => {
          const mechId = obj.mechanicId;
          console.log("Mechanic Id: " + mechId);
          if (req.body.status === "ACCEPTED") {
            MemberModel.updateOne(
              { _id: obj.mechanicId },
              {
                $set: { status: "NOT AVAILABLE" },
              }
            )
              .then((response) => {
                console.log("Member Status: NOT AVAILABLE");
              })
              .catch((err) => {
                console.log("Member Status Error: " + err);
              });
          } else {
            MemberModel.updateOne(
              { _id: obj.mechanicId },
              {
                $set: { status: "AVAILABLE" },
              }
            )
              .then((response) => {
                console.log("Member Status: AVAILABLE");
              })
              .catch((err) => {
                console.log("Member Status Error: " + err);
              });
          }
        })
        .catch((err) => {
          console.log("Find Order Error: " + err);
        });
      console.log("Order Updated Successfully");
      res.status(200).json({
        message: "Request Updated Successfully",
      });
    })
    .catch((err) => {
      console.log("Order Update error: " + err);
      res.status(500).json({ "Order Update error ": err });
    });
};

exports.findMyOrders = (req, res) => {
  OrderModel.find({ mechanicId: req.params.mechId })
    .exec()
    .then((response) => {
      if (response.length == 0) {
        res.status(200).json({
          message: "No Orders are available",
        });
      } else {
        res.status(200).json({ orders: response });
      }
    })
    .catch((err) => {
      console.log("Find All Orders Error: " + err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.addOrder = (req, res) => {
  const order = new Order({
    customerId: req.body.customerId,
    customerName: req.body.customerName,
    carName: req.body.carName,
    carNumber: req.body.carNumber,
    custAddress: req.body.custAddress,
    serviceName: req.body.serviceName,
    servicePrice: req.body.servicePrice,
  });
  order
    .save()
    .then((result) => {
      console.log("Order Placed: " + result);
      res.status(201).json({
        message: "Thank you for your order.",
        result,
      });
    })
    .catch((err) => {
      console.log("Placing Order Error" + err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.findCompltedOrders = (req, res) => {
  Order.find({ status: "COMPLETED" })
    .exec()
    .then((response) => {
      if (response.length == 0) {
        res.status(200).json({
          message: "No Orders are available",
        });
      } else {
        res.status(200).json({
          orders: response,
        });
      }
    })
    .catch((err) => {
      console.log("Find All Completed Orders Error: " + err);
      res.status(500).json({
        error: err,
      });
    });
};
