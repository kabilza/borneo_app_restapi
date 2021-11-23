const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const checkAuth = require('../middleware/check-auth');

const Battery = require('../models/battery');