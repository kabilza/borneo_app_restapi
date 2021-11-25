const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const checkAuth = require('../api/middleware/check-auth');

const BatteryController = require('../controllers/battery');

router.get("/fetchBattery", BatteryController.fetchBattery);

router.post("/addNewBattery", BatteryController.registerNewBattery);

router.delete("/removeBattery", BatteryController.removeBattery);

module.exports = router;