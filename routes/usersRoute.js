const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const middleware = require("../middlewares/authMiddleware");

router.post("/register", async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      res
        .status(200)
        .send({ message: "email is already exist", success: false });
      return;
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    req.body.password = hashPassword;
    const newuser = new User(req.body);
    await newuser.save();
    res
      .status(200)
      .send({ message: "User Created Succesfully", success: true });
  } catch (err) {
    res.status(500).send({ message: "Error in creating user", success: false });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User Does not exist", success: false });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Password is incorrect", success: false });
    }

    const tokenKey = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).send({
      message: "Logged in Successfully",
      success: true,
      token: tokenKey,
      email: req.body.email,
    });
  } catch (err) {
    console.log(err);
    res.send(200).send({ message: "Something went wrong", success: false });
  }
});

router.post("/get-user-info-by-id", middleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userid });

    if (!user) {
      res.status(200).send({ message: "user does not exist", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: {
          name: user.name,
          email: user.email,
        },
      });
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: "error getting users info", success: false, err });
  }
});

module.exports = router;
