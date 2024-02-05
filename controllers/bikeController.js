// bikeController.js
const BikeModel = require("../model/bikeModel");

// Add Bike
exports.addBike = (req, res) => {
  BikeModel.findOne({ name: req.body.name })
    .exec()
    .then((response) => {
      if (response) {
        return res.status(409).json({
          message: "Name Already Exists",
        });
      } else {
        const bike = new BikeModel({
          name: req.body.name,
          brand: req.body.brand,
        });
        bike.save().then((response) => {
          console.log("Bike Added: " + response);
          res.status(201).json({
            message: "Bike Added Successfully",
            bike: {
              brand: response.brand,
              name: response.name,
              _id: response._id,
            },
          });
        });
      }
    })
    .catch((err) => {
      console.log("Add Bike Error: " + err);
      res.status(500).json({
        error: err,
      });
    });
};

// Find All Bikes
exports.findAllBikes = (req, res) => {
  BikeModel.find()
    .select("_id name brand")
    .exec()
    .then((response) => {
      console.log(response);
      if (response.length === 0) {
        res.status(200).json({
          message: "No bikes Available",
        });
      } else {
        res.send(response);
      }
    })
    .catch((err) => {
      console.log("Find All Bikes Method Error: " + err);
      res.status(500).json({
        error: err,
      });
    });
};

// Find All Brands
exports.findAllBrands = (req, res) => {
  BikeModel.find()
    .distinct("brand")
    .exec()
    .then((response) => {
      if (response.length === 0) {
        res.status(200).json({
          message: "No Brands Available",
        });
      } else {
        res.send(response);
      }
    })
    .catch((err) => {
      console.log("Find All Brand Method Error: " + err);
      res.status(500).json({
        error: err,
      });
    });
};

// Find Bikes By Brand
exports.findByBrand = (req, res) => {
  BikeModel.find({ brand: req.body.brand })
    .select("name")
    .exec()
    .then((response) => {
      if (response.length < 1) {
        return res.status(404).json({
          message: "This Brand is Not available",
        });
      } else {
        return res.status(200).json({
          bikes: response.map((bike) => {
            return { name: bike.name, _id: bike._id };
          }),
        });
      }
    })
    .catch((err) => {
      console.log("Find By Brand Error: " + err);
      res.status(500).json({
        error: err,
      });
    });
};

// Find Bike By ID
exports.findByBikeId = (req, res) => {
  BikeModel.findOne({ _id: req.params.bikeId })
    .exec()
    .then((response) => {
      if (response === null) {
        return res.status(404).json({
          message: "This Bike is Not available",
        });
      } else {
        return res.status(200).json({
          response,
        });
      }
    })
    .catch((err) => {
      console.log("Find By Bike Error: " + err);
      res.status(500).json({
        error: err,
      });
    });
};

// Update Bike Details
exports.updateBike = (req, res) => {
  const obj = req.body;
  const id = req.params.id;
  BikeModel.updateOne({ _id: id }, { $set: obj })
    .exec()
    .then(() => {
      console.log("Updated Successfully");
      res.status(200).json({
        message: "Bike Updated Successfully",
      });
    })
    .catch((err) => {
      console.log("Update Bike Error: " + err);
      res.status(500).json({
        error: err,
      });
    });
};

// Delete Bike
exports.deleteBike = (req, res) => {
  BikeModel.deleteOne({ _id: req.params.bikeId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Bike deleted Successfully",
      });
    })
    .catch((err) => {
      console.log("Delete Bike: " + err);
      res.status(500).json({
        error: err,
      });
    });
};
