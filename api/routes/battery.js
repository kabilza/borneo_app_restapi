const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require('../middleware/check-auth');

const BatteryController = require('../controllers/battery');

router.get("/fetchBattery", BatteryController.fetchBattery);

router.post("/addNewBattery", checkAuth, BatteryController.registerNewBattery);

router.delete("/removeBattery", checkAuth, BatteryController.removeBattery);

module.exports = router;