const app = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

// app.get("/", async (req, res, next) => {
//   try {
//     const users = await User.find();
//     res.json({
//       result: users,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

app.post("/signup", async (req, res, next) => {
  try {
    bcrypt.hash("password123", 8, function (err, hash) {
      res.json({
        result: hash,
      });
    });
  } catch (error) {
    next(error);
  }
});

app.post("/signin", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).lean();
    if (!user) {
      res.status(401).send({ status: "error", message: "User not found" });
    } else {
      bcrypt.compare("password123", user.password, function (err, match) {
        if (match) {
          var token = jwt.sign(user, "ngajiapp", {
            expiresIn: 86400,
          });
          res.json({
            token,
          });
        }
      });
    }
  } catch (error) {
    next(error);
  }
});

app.post("/token", async (req, res, next) => {
  try {
    var decoded = jwt.verify(req.body.token, "ngajiapp");
    res.json({
      decoded,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = app;
