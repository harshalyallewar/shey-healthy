import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import TimePicker from "react-time-picker";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import axios from "axios";
import { hideLoading, showLoading } from "../../redux/alertsSlice";

function DoctorProfile() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [address, setaddress] = useState("");
  const [specialization, setspecialization] = useState("");
  const [experience, setexperience] = useState("");
  const [feePerConsultation, setfeePerConsultation] = useState("");
  const [website, setwebsite] = useState("");
  const [startTime, setstartTime] = useState("");
  const [endTime, setendTime] = useState("");

  console.log(
    firstName,
    lastName,
    phoneNumber,
    address,
    specialization,
    experience,
    feePerConsultation,
    website,
    startTime,
    endTime
  );

  const { userDetails } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateDoctor = async () => {
    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !address ||
      !specialization ||
      !experience ||
      !feePerConsultation ||
      !website ||
      !startTime ||
      !endTime
    ) {
      toast.error("Please Enter All Details");
      return;
    }
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/admin/update-doctor-profile",
        {
          firstName,
          lastName,
          phoneNumber,
          address,
          specialization,
          experience,
          feePerConsultation,
          website,
          startTime,
          endTime,
          userId: userDetails._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success("Succesfully updated for doctor account");
      } else {
        toast.error("error in updating, please try again");
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log("error occured in requesting apply doctor account");
    }
  };

  const prePopulateDoctorInfo = async ()=>{
        try {

          dispatch(showLoading());
      const response = await axios.get(
        "/api/admin/get-doctor-info-by-userid",
       
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
          
      dispatch(hideLoading());

      if (response.data.success) {
         const res = response.data.data;
         console.log(res);

         setfirstName(res.firstName);
         setlastName(res.lastName)
         setphoneNumber(res.phoneNumber)
         setaddress(res.address)
         setspecialization(res.specialization)
         setexperience(res.experience)
         setfeePerConsultation(res.feePerConsultation)
         setwebsite(res.website)
         setstartTime(res.startTime)
         setendTime(res.endTime)
      } else {
        toast.error("error in getting doctor info, please try again");
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log("error occured in getting doctor info");
    }
  }

  useEffect(()=>{
    prePopulateDoctorInfo();
  },[])

  const h1style = {
    fontSize: "28px",
    mx: "5px",
    fontWeight: "600",
  };

  const h2style = {
    fontSize: "24px",
    color: "#454444",
    fontWeight: "500",
    mb: "5px",
    pl: "10px",
  };

  const typoStyle = {
    mb: "8px",
    ml: "6px",
    width: "100%",
  };

  const griditemStyle = {
    p: "10px",
  };

  return (
    <Layout>
      <Typography sx={h1style}>Apply Doctor</Typography>
      <hr />

      <Grid container>
        <Grid item xs={12}>
          <Typography sx={h2style}>Personal Information</Typography>
        </Grid>

        <Grid item xs={12} lg={4} sx={griditemStyle}>
          <Typography sx={typoStyle}>First Name</Typography>
          <TextField
            value={firstName}
            fullWidth
            size="small"
            onChange={(e) => setfirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} lg={4} sx={griditemStyle}>
          <Typography sx={typoStyle}>Last Name</Typography>
          <TextField
            value={lastName}
            fullWidth
            size="small"
            onChange={(e) => setlastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} lg={4} sx={griditemStyle}>
          <Typography sx={typoStyle}>Phone Number</Typography>
          <TextField
            value={phoneNumber}
            fullWidth
            size="small"
            onChange={(e) => setphoneNumber(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} lg={4} sx={griditemStyle}>
          <Typography sx={typoStyle}>Website</Typography>
          <TextField
            value={website}
            fullWidth
            size="small"
            onChange={(e) => setwebsite(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} lg={4} sx={griditemStyle}>
          <Typography sx={typoStyle}>Address</Typography>
          <TextField
            value={address}
            fullWidth
            size="small"
            onChange={(e) => setaddress(e.target.value)}
          />
        </Grid>
      </Grid>
      <hr />

      <Grid container>
        <Grid item xs={12}>
          <Typography sx={h2style}>Professional Information</Typography>
        </Grid>

        <Grid item xs={12} lg={4} sx={griditemStyle}>
          <Typography sx={typoStyle}>Specialization</Typography>
          <TextField
            value={specialization}
            fullWidth
            size="small"
            onChange={(e) => setspecialization(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} lg={4} sx={griditemStyle}>
          <Typography sx={typoStyle}>Experience</Typography>
          <TextField
            value={experience}
            fullWidth
            size="small"
            onChange={(e) => setexperience(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} lg={4} sx={griditemStyle}>
          <Typography sx={typoStyle}>Fee Per Consultation</Typography>
          <TextField
            value={feePerConsultation}
            fullWidth
            size="small"
            onChange={(e) => setfeePerConsultation(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography sx={h2style}>Timings</Typography>
        </Grid>
        <Grid item xs={12} lg={2} sx={griditemStyle}>
          <Typography sx={typoStyle}>Start Time</Typography>

          <TimePicker onChange={(val) => setstartTime(val)} value={startTime} />
        </Grid>

        <Grid item xs={12} lg={2} sx={griditemStyle}>
          <Typography sx={typoStyle}>End Time</Typography>

          <TimePicker onChange={(val) => setendTime(val)} value={endTime} />
        </Grid>

        <Grid
          item
          xs={12}
          lg={8}
          sx={{ display: "flex", alignItems: "center", justifyContent: "end" }}
        >
          <Button
            onClick={updateDoctor}
            sx={{ backgroundColor: "#005555", mr: "70px" }}
            variant="contained"
            size="large"
          >
            SUBMIT
          </Button>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default DoctorProfile;
