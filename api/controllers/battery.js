const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uniqid = require("uniqid");

const Battery = require("../models/battery");

exports.registerNewBattery = (req, res, next) => {
  let userToken = req.query.auth;
  // console.log(req.body);
  const battery = new Battery({
    _id: new mongoose.Types.ObjectId(),
    userId: req.body.userId,
    barcode: req.body.batteryBarcode,
    brand: req.body.batteryBrand,
    type: req.body.batteryType,
    warrantyPeriod: req.body.warrantyPeriod,
    dateInstalled: req.body.dateInstalled,
    model: req.body.model,
    shopName: req.body.shopName,
    shopProvince: req.body.shopProvince,
    shopDistrict: req.body.shopDistrict,
    shopPhoneNumber: req.body.shopPhoneNumber,
  });
  battery
    .save()
    .then((result) => {
      console.log(result);
      return res.status(200).json({
        message: "Added New Battery",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(200).json({
        err,
      });
    });
};

exports.fetchBattery = async (req, res, next) => {
  let myUserId = req.query.userId;
  // console.log(myUserId);
  const fetchedBattery = await Battery.find({ userId: myUserId });
  try {
    return res.status(200).json(fetchedBattery);
  } catch (err) {
    (err) => {
      console.log(err);
      res.status(200).json({
        err,
      });
    };
  }
};

exports.removeBattery = (req, res, next) => {};
