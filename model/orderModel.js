const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  customerId: { type: String },
  customerName: { type: String },
  bikeName: { type: String },
  bikeNumber: { type: String },
  custAddress: { type: String, max: 40 },
  serviceName: { type: String },
  servicePrice: { type: String },
  mechanicid: { type: String },
  requestedOn: { type: Date, default: Date.now() },
  deliveredOn: { type: Date },
  status: {
    type: String,
  },
});

module.exports = mongoose.model("order", orderSchema);
