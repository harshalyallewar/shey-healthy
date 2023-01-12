const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");
const User = require("../models/usersModel");
const moment = require("moment/moment");
const app = express();
const router = express.Router();

router.post("/book-appointment", authMiddleware, async (req, res) => {
  try {
    const { userId, doctorId, userInfo, doctorInfo } = req.body;

    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    req.body.userId = req.body.userid;

    const appointment = new Appointment(req.body);
    await appointment.save();
    const user = await User.findOne({ _id: doctorInfo.userId });
    const unseenNotifications = user.unseenNotifications;

    //pushing notifications to doctor basedon his user id
    unseenNotifications.unshift({
      type: "new-appointment-request",
      message: `A new appointment request has been made by ${userInfo.name}`,
      onClickPath: "/doctor/appointments",
    });

    await user.save();

    res.status(200).send({
      message: "appointment booked Succesfully",
      success: true,
    });
  } catch (err) {
    res.status(500).send({
      message: "Error in booking appointment",
      success: false,
      err,
    });
  }
});

router.post("/get-doctor-info-by-id", authMiddleware, async (req, res) => {
  try {
    const { doctorId } = req.body;
    
    const doctor = await Doctor.findOne({_id:doctorId});

    res.status(200).send({
      message: "appointment booked Succesfully",
      success: true,
      data:doctor
    });
  } catch (err) {
    res.status(500).send({
      message: "Error in booking appointment",
      success: false,
      err,
    });
  }
});

router.post("/check-appointment", authMiddleware, async (req, res) => {
  try {
    const { doctorId,time } = req.body;
    const fromTime = moment(time,"HH:mm").subtract(1,'hours').toISOString();
    const toTime = moment(time,"HH:mm").add(1,'hours').toISOString();
    const date = moment(req.body.date, "DD-MM-YYYY").toISOString();

    const appointments = await Appointment.find({
      doctorId,
      date,
      time: {
        $gte: fromTime,
        $lte:toTime
      },status:'approved'
    });
         
    if(appointments.length>0){
        res.status(200).send({
          message: "appointment is not available",
          success: false,
        });
    } else {
      res.status(200).send({
        message: "appointment is available",
        success: true,
      });
    }

  } catch (err) {
    res.status(500).send({
      message: "Error in checking appointment",
      success: false,
      err,
    });
  }
});

router.post("/change-appointment-status", authMiddleware, async (req, res) => {
  try {
    const app = await Appointment.findOne({ _id: req.body.appointmentId });
    app.status = req.body.status;
    await app.save();
console.log(app);
    const user = await User.findOne({ _id: app.userid });
    console.log(user, app.userId);
    user.unseenNotifications.unshift({
      type: "Appointment-Status changed",
      message: `appointment is ${app.status}`,
      onClickPath: "/user/appointments",
    });

    await user.save();

    res.status(200).send({
      message: "appointment status changed Succesfully",
      success: true,
    });
  } catch (err) {
    res.status(500).send({
      message: "Error in changing appointment status",
      success: false,
      err,
    });
  }
});



module.exports = router
