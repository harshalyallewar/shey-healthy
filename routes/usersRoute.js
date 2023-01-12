const express = require("express");
const app = express();
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const middleware = require("../middlewares/authMiddleware");
const cors = require("cors");
const Doctor = require("../models/doctorModel");
const { findOne } = require("../models/usersModel");
const Appointment = require("../models/appointmentModel");



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
    res.status(200).send({
      message: "User Created Succesfully",
      success: true,
      id: newuser._id,
    });
  } catch (err) {
    res.status(500).send({ message: "Error in creating user", success: false , err});
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
      id: user._id,
    });
  } catch (err) {
    res
      .status(200)
      .send({ message: "Something went wrong", success: false });
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
        user,
      });
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: "error getting users info", success: false, err });
  }
});

router.post("/apply-doctor-account", middleware, async (req, res) => {
  try {
    const newdoctor = new Doctor({ ...req.body, status: "pending" });
    await newdoctor.save();
    const adminUser = await User.findOne({ isAdmin: true });

    const unseenNotifications = adminUser.unseenNotifications;

    unseenNotifications.unshift({
      type: "new-doctor-request",
      message: `${newdoctor.firstName} ${newdoctor.lastName} has applied for a doctor account`,
      data: {
        doctorId: newdoctor._id,
        name: newdoctor.firstName + " " + newdoctor.lastName,
      },
      onClickPath: "/admin/doctors",
    });

    await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });
   
    res.status(200).send({
      success:true,
      message:"Doctor account applied successfully"
    })
  } catch (error) {
    res
      .status(500)
      .send({ message: "error in applying doctor account", success: false, error });
  }
});

router.post("/clear-notifications", middleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
   
    user.seenNotifications = [];

    const updatedUser = await user.save();
    updatedUser.password = undefined;

    res.status(200).send({
      success: true,
      message: "Notifications Cleared",
      data: updatedUser,
    });
  } catch {
    res.status(500).send({
      message: "error in clearing notifications",
      success: false,
      error,
    });
  }
});

router.post("/mark-as-seen", middleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    const unseenNotifications = user.unseenNotifications;
    const seenNotifications = user.seenNotifications;

    seenNotifications.unshift(...unseenNotifications);
    user.seenNotifications = seenNotifications;
    user.unseenNotifications = [];

    const updatedUser = await user.save();
    updatedUser.password = undefined;

    res.status(200).send({
      success: true,
      message: "Notifications seen",
      data: updatedUser,
    });
  } catch {
    res.status(500).send({
      message: "error in seen notifications",
      success: false,
      error,
    });
  }
});

router.get("/deleteall", async (req, res) => {
  try {
    const user = await User.deleteMany({});
    const doctor = await Doctor.deleteMany({});

    res.send("delted all users and doctors")
   
  } catch {
    res.status(500).send({
      message: "error in seen notifications",
      success: false,
      error,
    });
  }
});

router.get("/get-all-docters", middleware, async (req, res) => {
  try {
    const docters = await Doctor.find({status:"approved"});
    res.status(200).send({
      message: "doctor fetched Succesfully",
      success: true,
      data: docters,
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error in getting doctors list", success: false, err });
  }
});

router.get("/get-all-appointments-by-userid", middleware, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId:req.body.userid });

    res.status(200).send({
      message: "appointments fetched Succesfully",
      success: true,
      data: appointments,
    });
  } catch (err) {
    res
      .status(500)
      .send({
        message: "Error in getting appointments list",
        success: false,
        err,
      });
  }
});



module.exports = router;
