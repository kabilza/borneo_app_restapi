const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const checkAuth = require('../api/middleware/check-auth');

const Battery = require('../models/battery');

module.exports = router;