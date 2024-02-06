const Member = require("../model/memberModel");
const Customer = require("../model/customerModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const authConfig = require("../config/authConfig");

exports.login = (req, res, next) => {
  Member.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Authentication Failed",
        });
      } else {
        bcrypt.compare(req.body.password, user.password, (err, response) => {
          if (err) {
            return res.status(401).json({
              message: "Authentication Failed",
            });
          } else if (response) {
            const token = jwt.sign(
              {
                userId: user._id,
              },
              authConfig.secretkey,
              {
                expiresIn: "1h",
              }
            );
            return res.status(200).json({
              message: "Authentication Successful",
              userId: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              token: token,
            });
          } else {
            return res.status(401).json({
              message: "Authentication Failed",
            });
          }
        });
      }
    })
    .catch((err) => {
      console.log("Login: " + err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.register = (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  Member.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Member Already Exist",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const member = new Member({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              password: hash,
              mobile: req.body.mobile,
            });
            member
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "Registered Successfully",
                  user: result,
                });
              })
              .catch((err) => {
                console.log("Registration Error" + err);
                res.status(500).json({
                  Registartion_Error: err,
                });
              });
          }
        });
      }
    });
};

exports.updateprofile = (req, res) => {
  const id = req.params.custId;
  Customer.updateOne({ _id: id }, { $set: req.body })
    .exec()
    .then((response) => {
      console.log("Profile Update Successfully" + response);
      res.status(200).json({
        message: "Profile Upated Successfully",
        response,
      });
    })
    .catch((err) => {
      console.log("profile update error" + err);
      res.status(500).json({ "profile Update err": err });
    });
};

exports.customerlogin = (req, res, next) => {
  Customer.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Authentication Failed",
        });
      } else {
        bcrypt.compare(req.body.password, user.password, (err, response) => {
          if (err) {
            return res.status(401).json({
              message: "Authentication Failed",
            });
          } else if (response) {
            const token = jwt.sign(
              {
                userId: user._id,
              },
              authConfig.secretkey,
              {
                expiresIn: "2h",
              }
            );
            return res.status(200).json({
              message: "Authentication Successful",
              userId: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              token: token,
            });
          } else {
            return res.status(401).json({ message: "Authentication Failed" });
          }
        });
      }
    })

    .catch((err) => {
      console.log("Login:" + err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.customerregister = (req, res, next) => {
  console.log("Inside Register");
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  Customer.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(401).json({
          message: "User Already exits",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new Customer({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              password: hash,
              role: req.body.role,
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "Registered Successfully",
                  user: result,
                });
              })
              .catch((err) => {
                console.log("Registration Error" + err);
                res.status(500).json({
                  Registartion_error: err,
                });
              });
          }
        });
      }
    });
};

exports.getAllCustomer = (req, res) => {
  Customer.find()
    .select("name email_id")
    .exec()
    .then((results) => {
      const response = {
        count: results.length,
        products: results.map((result) => {
          return {
            name: result.name,
            email: result.email,
            _id: result._id,
            request: {
              type: "GET",
              url:
                "http://localhost:8080/customer/account/findCustById/" +
                result._id,
            },
          };
        }),
      };
      if (results.length > 0) {
        res.status(200).json({ response });
      } else {
        res.status(200).json("Empty List");
      }
    })
    .catch((err) => {
      console.log("Get All customer  error" + err);
      res.status(500).json({ "get all customer err": err });
    });
};

exports.findCustById = (req, res) => {
  Customer.findById({ _id: req.params.custId })
    .select("name email_id")
    .exec()
    .then((result) => {
      if (result) {
        return res.status(200).json({
          name: result.name,
          email: result.email,
          _id: result._id,
        });
      } else {
        res.status(400).json({ message: "Invalid Id" });
      }
    })
    .catch((err) => {
      console.log("Find Customer By error" + err);
      res.status(500).json({ "Find customer By Id": err });
    });
};

exports.deleteCustomer = (req, res) => {
  Customer.deleteOne({ _id: req.params.custId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Account Deleted Successfully",
      });
    })
    .catch((err) => {
      console.log("delete customer  error" + err);
      res.status(500).json({ "delete customer err": err });
    });
};
