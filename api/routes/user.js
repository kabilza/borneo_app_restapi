const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require('../middleware/check-auth');

const userController = require('../controllers/user')


router.post("/signup", userController.userSignUp);

router.post("/signin", userController.userSignIn);

router.post("/profile/changeProfile", checkAuth, userController.userChangeProfile);


module.exports = router;