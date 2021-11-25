const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uniqid = require("uniqid");

const User = require("../models/user");

exports.userSignUp = (req, res, next) => {
  const myLocalId = uniqid();
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail already exists",
        });
      } else {
        // salt = random strings to make reversing the hash impossible
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              localId: myLocalId,
              idToken: "null",
              displayName: "Please edit name in Settings!",
              profileImage: "null",
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "User created",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
};

exports.userSignIn = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email }).exec();
  try {
    if (!user) {
      return res.status(401).json({
        message: "Auth failed",
      });
    }
    // console.log(user);
    bcrypt.compare(req.body.password, user.password, async (err, result) => {
      if (err) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      if (result) {
        const token = jwt.sign(
          {
            email: user.email,
            userId: user._id,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "1h",
          }
        );
        user.idToken = token;
        await user.save();
      }
    });
    return res.status(200).json({
      message: "Found email!",
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};
