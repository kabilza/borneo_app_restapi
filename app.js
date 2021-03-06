const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");

const userRoutes = require("./api/routes/user");
const batteryRoutes = require("./api/routes/battery");

mongoose.connect(
  "mongodb+srv://dbAdmin123:" +
    process.env.MONGO_ATLAS_PW +
    "@nodejs-api-db.8gnrw.mongodb.net/nodejs-api-db?retryWrites=true&w=majority"
);

app.use('/uploads', express.static('uploads'));
app.use(morgan("dev")); // to add status in console
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

// app.use("/products", productRoutes);
// app.use("/orders", orderRoutes);
app.use("/battery", batteryRoutes);
app.use("/user", userRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
