const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const Doctor = require("../models/doctorModel");
const User = require("../models/usersModel");
const app = express();
const router = express.Router();


router.get('/get-all-docters',authMiddleware ,async (req,res)=>{
    try {
    const docters = await Doctor.find({});
    res.status(200).send({
      message: "doctor fetched Succesfully",
      success: true,
      data: docters,
    });
  } catch (err) {
    res.status(500).send({ message: "Error in getting doctors list", success: false , err});
  }
});


router.get('/get-all-users',authMiddleware ,async (req,res)=>{
    try {
    const users = await User.find({});
    res.status(200).send({
      message: "users fetched Succesfully",
      success: true,
      data: users,
    });
  } catch (err) {
    res.status(500).send({ message: "Error in getting users list", success: false , err});
  }
});

router.post(
  "/change-doctor-account-status",
  authMiddleware,
  async (req, res) => {
    
    try {
        const {doctorId,status} = req.body;
      const doctor = await Doctor.findByIdAndUpdate(doctorId,{status});
      const user = await User.findOne({_id:doctor.userId});
      doctor.status = status;
      
      if(doctor.status==="approved"){
        user.isDoctor = true;
      } else {
        user.isDoctor = false;
      }

      const unseenNotifications = user.unseenNotifications;

      unseenNotifications.unshift({
        message: `Your doctor account has been ${status}`,

        success: true,
        onClickPath: "/notifications",
      });

      await user.save();

      res.status(200).send({
        message: "doctor account status changed Succesfully",
        success: true,
        data: doctor,
      });
    } catch (err) {
      res
        .status(500)
        .send({ message: "Error in changing doctor account status", success: false, err });
    }
  }
);


router.get("/get-doctor-info-by-userid",authMiddleware, async (req, res) => {
  try {
    const { userid } = req.body;
    const doctor = await Doctor.findOne({userId:userid});
    console.log(doctor)

    if(doctor){
      res.status(200).send({
        message: "doctor information fetched Succesfully",
        success: true,
        data: doctor,
      });
    } else {
      res.status(200).send({
        message: "doctor information does not exist",
        success: false,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error in getting doctor information",
      success: false,
      err,
    });
  }
});

router.post("/update-doctor-profile", authMiddleware, async (req, res) => {
  try {
    
    const doctor = await Doctor.findOneAndUpdate({userId:req.body.userId},req.body);

    if (doctor) {
      res.status(200).send({
        message: "doctor information updated Succesfully",
        success: true,
        data: doctor,
      });
    } else {
      res.status(200).send({
        message: "doctor did not updated",
        success: false,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error in updating doctor information",
      success: false,
      err,
    });
  }
});



module.exports = router